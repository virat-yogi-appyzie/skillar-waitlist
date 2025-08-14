-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('ACTIVE', 'UNSUBSCRIBED');

-- CreateEnum
CREATE TYPE "public"."AdminRole" AS ENUM ('ADMIN', 'SUPER_ADMIN');

-- CreateTable
CREATE TABLE "public"."email_submissions" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "discovery_source" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_agent" TEXT,
    "ip_address" TEXT,
    "source" TEXT,
    "status" "public"."Status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "email_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."submission_attempts" (
    "id" TEXT NOT NULL,
    "ip_address" TEXT,
    "attempted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "success" BOOLEAN NOT NULL DEFAULT false,
    "user_agent" TEXT,
    "email" TEXT,
    "reason" TEXT,

    CONSTRAINT "submission_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."admin_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "public"."AdminRole" NOT NULL DEFAULT 'ADMIN',
    "last_login" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email_submissions_email_key" ON "public"."email_submissions"("email");

-- CreateIndex
CREATE INDEX "email_submissions_email_idx" ON "public"."email_submissions"("email");

-- CreateIndex
CREATE INDEX "email_submissions_created_at_idx" ON "public"."email_submissions"("created_at");

-- CreateIndex
CREATE INDEX "email_submissions_discovery_source_idx" ON "public"."email_submissions"("discovery_source");

-- CreateIndex
CREATE INDEX "submission_attempts_ip_address_idx" ON "public"."submission_attempts"("ip_address");

-- CreateIndex
CREATE INDEX "submission_attempts_attempted_at_idx" ON "public"."submission_attempts"("attempted_at");

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "public"."admin_users"("email");
