"use server";

import { randomUUID } from "crypto";
import { headers } from "next/headers";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

// Stores the intake first so a lead is never lost, then provisions the
// account on learning.skillar.ai. Rows live in the standalone `events`
// schema (npm run events:setup), not Prisma, so the event can be dropped
// cleanly afterwards.
// Env: EVENT_PLATFORM_{ONBOARDING_URL,API_KEY}; unset key leaves rows PENDING.

const EVENT = "eureka";

const RATING_AREA_TITLES = [
  "Problem & market clarity",
  "Solution & differentiation",
  "Business model & revenue clarity",
  "Traction & validation",
  "Narrative & storytelling",
  "Pitch delivery & Q&A readiness",
];

/** Form answer -> stable track key -> roadmap on the platform. */
const TRACK_KEYS: Record<string, string> = {
  "Pitch deck": "pitch-deck",
  "Financial modeling": "financial-modeling",
  "Investor Q&A": "investor-qa",
  Positioning: "positioning",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STAGES = new Set(["Idea", "Early pilot", "Revenue-generating"]);

export interface EventIntakeInput {
  founderName: string;
  startupName: string;
  email: string;
  phone: string;
  stage: string;
  need: string;
  sector?: string | null;
  /** Six self-ratings, 1-5, in RATING_AREA_TITLES order. */
  ratings: number[];
}

export interface EventIntakeResult {
  success: boolean;
  message?: string;
  /** Human-readable reference derived from the stored row. */
  reference?: string;
  /** True when the platform account + roadmap exist right now. */
  provisioned?: boolean;
  /**
   * True when this email already had a platform account (or an earlier
   * intake): no new credentials are issued, so the success screen must say
   * "sign in with your existing details" instead of "check your email".
   */
  alreadyRegistered?: boolean;
  score?: number;
}

export async function submitEventIntake(
  input: EventIntakeInput
): Promise<EventIntakeResult> {
  const founderName = (input.founderName || "").trim();
  const startupName = (input.startupName || "").trim();
  const email = (input.email || "").trim().toLowerCase();
  const phone = (input.phone || "").trim();
  const stage = (input.stage || "").trim();
  const need = (input.need || "").trim();
  const sector = input.sector?.trim() || null;
  const ratings = Array.isArray(input.ratings) ? input.ratings : [];

  if (founderName.length < 2) return { success: false, message: "Please enter your full name." };
  if (!startupName) return { success: false, message: "Please enter your startup's name." };
  if (!EMAIL_RE.test(email)) return { success: false, message: "That email doesn't look right." };
  const phoneDigits = phone.replace(/\D/g, "");
  if (phoneDigits.length < 8 || phoneDigits.length > 15)
    return { success: false, message: "Enter a valid phone number with country code." };
  if (!STAGES.has(stage)) return { success: false, message: "Pick the stage that fits best." };
  const trackKey = TRACK_KEYS[need];
  if (!trackKey) return { success: false, message: "Choose what you need most right now." };
  if (
    ratings.length !== RATING_AREA_TITLES.length ||
    ratings.some((v) => !Number.isInteger(v) || v < 1 || v > 5)
  )
    return { success: false, message: "Please rate all six areas." };

  const score = Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 20);
  const ratingsJson = Object.fromEntries(RATING_AREA_TITLES.map((area, i) => [area, ratings[i]]));

  let userAgent: string | null = null;
  let ip: string | null = null;
  try {
    const h = await headers();
    userAgent = h.get("user-agent");
    ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || null;
  } catch {
    // headers() unavailable outside a request; fine to store without them.
  }

  // DB-backed so limits hold across serverless instances. Per-IP allows a
  // booth volunteer submitting for several founders; global is a circuit breaker.
  try {
    if (ip) {
      const [{ n: ipCount }] = await prisma.$queryRaw<{ n: bigint }[]>(Prisma.sql`
        SELECT count(*) AS n FROM events.event_intakes
        WHERE ip = ${ip} AND created_at > now() - interval '10 minutes'
          AND NOT (event = ${EVENT} AND email = ${email})
      `);
      if (Number(ipCount) >= 5) {
        return {
          success: false,
          message: "Too many submissions from this connection. Please try again in a few minutes.",
        };
      }
    }
    const [{ n: globalCount }] = await prisma.$queryRaw<{ n: bigint }[]>(Prisma.sql`
      SELECT count(*) AS n FROM events.event_intakes
      WHERE created_at > now() - interval '5 minutes'
    `);
    if (Number(globalCount) >= 40) {
      return {
        success: false,
        message: "We're receiving a lot of submissions right now. Please try again in a few minutes.",
      };
    }
  } catch (error) {
    // A rate-limit read failing must never block a real lead.
    console.error("[submitEventIntake] rate-limit check failed:", error);
  }

  let rowId: string;
  try {
    const rows = await prisma.$queryRaw<{ id: string }[]>(Prisma.sql`
      INSERT INTO events.event_intakes
        (id, event, founder_name, startup_name, email, phone, stage, need,
         sector, ratings, score, track_key, user_agent, ip)
      VALUES
        (${randomUUID().replace(/-/g, "")}, ${EVENT}, ${founderName},
         ${startupName}, ${email}, ${phone}, ${stage}, ${need}, ${sector},
         ${JSON.stringify(ratingsJson)}::jsonb, ${score}, ${trackKey},
         ${userAgent}, ${ip})
      ON CONFLICT (event, email) DO UPDATE SET
        founder_name = EXCLUDED.founder_name,
        startup_name = EXCLUDED.startup_name,
        phone        = EXCLUDED.phone,
        stage        = EXCLUDED.stage,
        need         = EXCLUDED.need,
        sector       = EXCLUDED.sector,
        ratings      = EXCLUDED.ratings,
        score        = EXCLUDED.score,
        track_key    = EXCLUDED.track_key,
        updated_at   = now()
      RETURNING id
    `);
    rowId = rows[0].id;
  } catch (error) {
    console.error("[submitEventIntake] store failed:", error);
    return {
      success: false,
      message: "Something went wrong saving your details. Please try again.",
    };
  }

  const reference = `EUR-${rowId.slice(-6).toUpperCase()}`;

  const markProvisioning = (
    status: "PROVISIONED" | "FAILED",
    platformUserId: string | null,
    error: string | null
  ) =>
    prisma.$executeRaw(Prisma.sql`
      UPDATE events.event_intakes
      SET provisioning = ${status},
          platform_user_id = ${platformUserId},
          provisioning_error = ${error},
          updated_at = now()
      WHERE id = ${rowId}
    `);

  // ── Provision on learning.skillar.ai (best-effort) ─────────────────────
  const apiKey = process.env.EVENT_PLATFORM_API_KEY;
  const endpoint =
    process.env.EVENT_PLATFORM_ONBOARDING_URL ||
    "https://learning.skillar.ai/api/external/event-onboarding";

  if (!apiKey) {
    console.warn("[submitEventIntake] EVENT_PLATFORM_API_KEY unset; row left PENDING");
    return { success: true, reference, provisioned: false, score };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({
        email,
        name: founderName,
        phone,
        startupName,
        trackKey,
        event: EVENT,
      }),
      signal: AbortSignal.timeout(30000),
    });
    const data = (await res.json().catch(() => null)) as {
      success?: boolean;
      created?: boolean;
      userId?: string;
      departmentAssigned?: boolean;
      hasRoadmaps?: boolean;
    } | null;

    if (res.ok && data?.success) {
      // No roadmap yet is expected, not a failure; only the copy differs.
      await markProvisioning("PROVISIONED", data.userId || null, null);
      return {
        success: true,
        reference,
        provisioned: data.hasRoadmaps === true,
        alreadyRegistered: data.created === false,
        score,
      };
    }

    const errMsg = `HTTP ${res.status}${data ? ` ${JSON.stringify(data).slice(0, 300)}` : ""}`;
    await markProvisioning("FAILED", null, errMsg);
    console.error("[submitEventIntake] provisioning failed:", errMsg);
  } catch (error) {
    // A timeout does not mean the account was not created; the platform may
    // have finished after we gave up, so flag it for review rather than retry.
    const errMsg = error instanceof Error ? error.message : "unknown error";
    const timedOut = errMsg.toLowerCase().includes("abort") || errMsg.toLowerCase().includes("timeout");
    await markProvisioning(
      "FAILED",
      null,
      timedOut ? `${errMsg} (may have succeeded, verify before re-provisioning)` : errMsg
    ).catch(() => {});
    console.error("[submitEventIntake] provisioning error:", errMsg);
  }

  // The intake itself succeeded; provisioning will be retried.
  return { success: true, reference, provisioned: false, score };
}
