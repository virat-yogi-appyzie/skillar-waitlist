/*
  Warnings:

  - A unique constraint covering the columns `[email_normalized]` on the table `email_submissions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email_normalized` to the `email_submissions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."DeliveryStatus" AS ENUM ('NONE', 'QUEUED', 'SENT', 'FAILED', 'SUPPRESSED');

-- CreateEnum
CREATE TYPE "public"."SuppressionReason" AS ENUM ('HARD_BOUNCE', 'COMPLAINT', 'MANUAL');

-- Step 1: Add new columns (email_normalized as nullable first)
ALTER TABLE "public"."email_submissions" ADD COLUMN     "confirmed_at" TIMESTAMP(3),
ADD COLUMN     "email_normalized" TEXT,
ADD COLUMN     "first_message_id" TEXT,
ADD COLUMN     "last_delivery_at" TIMESTAMP(3),
ADD COLUMN     "last_delivery_status" "public"."DeliveryStatus" NOT NULL DEFAULT 'NONE',
ADD COLUMN     "last_error_code" TEXT,
ADD COLUMN     "last_error_message" TEXT,
ADD COLUMN     "message_provider" TEXT;

-- Step 2: Populate email_normalized for existing data and set confirmedAt (single opt-in)
UPDATE "public"."email_submissions" 
SET 
    "email_normalized" = LOWER("email"),
    "confirmed_at" = "created_at"
WHERE "email_normalized" IS NULL;

-- Step 3: Handle Gmail normalization (remove dots and plus aliases)
UPDATE "public"."email_submissions" 
SET "email_normalized" = LOWER(
    CASE 
        WHEN LOWER("email") LIKE '%@gmail.com' OR LOWER("email") LIKE '%@googlemail.com' THEN
            REPLACE(SPLIT_PART(SPLIT_PART("email", '@', 1), '+', 1), '.', '') || '@' || LOWER(SPLIT_PART("email", '@', 2))
        ELSE
            LOWER("email")
    END
);

-- Step 4: Make email_normalized NOT NULL
ALTER TABLE "public"."email_submissions" ALTER COLUMN "email_normalized" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."email_deliveries" (
    "id" TEXT NOT NULL,
    "email_submission_id" TEXT NOT NULL,
    "to_email_normalized" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "template_name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message_id" TEXT,
    "sent_at" TIMESTAMP(3),
    "status" "public"."DeliveryStatus" NOT NULL DEFAULT 'QUEUED',
    "error_code" TEXT,
    "error_message" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_deliveries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."email_suppressions" (
    "id" TEXT NOT NULL,
    "email_normalized" TEXT NOT NULL,
    "reason" "public"."SuppressionReason" NOT NULL,
    "provider" TEXT,
    "first_seen_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_seen_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "evidence" JSONB,

    CONSTRAINT "email_suppressions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "email_deliveries_email_submission_id_idx" ON "public"."email_deliveries"("email_submission_id");

-- CreateIndex
CREATE INDEX "email_deliveries_message_id_idx" ON "public"."email_deliveries"("message_id");

-- CreateIndex
CREATE INDEX "email_deliveries_sent_at_idx" ON "public"."email_deliveries"("sent_at");

-- CreateIndex
CREATE INDEX "email_deliveries_status_idx" ON "public"."email_deliveries"("status");

-- CreateIndex
CREATE INDEX "email_deliveries_to_email_normalized_idx" ON "public"."email_deliveries"("to_email_normalized");

-- CreateIndex
CREATE UNIQUE INDEX "email_suppressions_email_normalized_key" ON "public"."email_suppressions"("email_normalized");

-- CreateIndex
CREATE INDEX "email_suppressions_reason_idx" ON "public"."email_suppressions"("reason");

-- CreateIndex
CREATE INDEX "email_suppressions_first_seen_at_idx" ON "public"."email_suppressions"("first_seen_at");

-- Step 5: Create unique index on email_normalized (after data is populated)
CREATE UNIQUE INDEX "email_submissions_email_normalized_key" ON "public"."email_submissions"("email_normalized");

-- CreateIndex
CREATE INDEX "email_submissions_email_normalized_idx" ON "public"."email_submissions"("email_normalized");

-- CreateIndex
CREATE INDEX "email_submissions_last_delivery_status_idx" ON "public"."email_submissions"("last_delivery_status");

-- AddForeignKey
ALTER TABLE "public"."email_deliveries" ADD CONSTRAINT "email_deliveries_email_submission_id_fkey" FOREIGN KEY ("email_submission_id") REFERENCES "public"."email_submissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
