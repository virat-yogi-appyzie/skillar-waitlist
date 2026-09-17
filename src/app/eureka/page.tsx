import type { Metadata } from "next";
import EurekaIntake from "./EurekaIntake";
import "./eureka.css";

/**
 * /eureka — the founder intake funnel for the Eureka (E-Cell IIT Bombay)
 * startup event, dressed in the Skillar system (fonts and tokens come from
 * the root layout; eureka.css scopes the form's own rules under .evi). No
 * site header or footer: this page is the target of the event QR code and
 * the form is the whole job.
 */

export const metadata: Metadata = {
  title: "Pitch readiness check | Skillar for Eureka",
  description:
    "Three minutes: rate your pitch readiness and get a Skillar account with a roadmap matched to what your startup needs most.",
  robots: { index: false },
};

export default function EurekaPage() {
  return <EurekaIntake />;
}
