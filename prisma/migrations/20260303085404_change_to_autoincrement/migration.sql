/*
  Warnings:

  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Role` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `RoleSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Skill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Skill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `UserAssessment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `UserAssessment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `industries` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `industries` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `skill_assessments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `skill_assessments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[name,industryId,roleId]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `industryId` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `roleId` on the `RoleSkill` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `skillId` on the `RoleSkill` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `UserAssessment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `industryId` on the `UserAssessment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `roleId` on the `UserAssessment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `assessmentId` on the `skill_assessments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `skillId` on the `skill_assessments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."Role" DROP CONSTRAINT "Role_industryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RoleSkill" DROP CONSTRAINT "RoleSkill_roleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RoleSkill" DROP CONSTRAINT "RoleSkill_skillId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserAssessment" DROP CONSTRAINT "UserAssessment_industryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserAssessment" DROP CONSTRAINT "UserAssessment_roleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserAssessment" DROP CONSTRAINT "UserAssessment_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."skill_assessments" DROP CONSTRAINT "skill_assessments_assessmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."skill_assessments" DROP CONSTRAINT "skill_assessments_skillId_fkey";

-- DropIndex
DROP INDEX "public"."Skill_name_key";

-- AlterTable
ALTER TABLE "public"."Role" DROP CONSTRAINT "Role_pkey",
ADD COLUMN     "isCustom" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isGeneric" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "industryId",
ADD COLUMN     "industryId" INTEGER NOT NULL,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."RoleSkill" DROP CONSTRAINT "RoleSkill_pkey",
DROP COLUMN "roleId",
ADD COLUMN     "roleId" INTEGER NOT NULL,
DROP COLUMN "skillId",
ADD COLUMN     "skillId" INTEGER NOT NULL,
ADD CONSTRAINT "RoleSkill_pkey" PRIMARY KEY ("roleId", "skillId");

-- AlterTable
ALTER TABLE "public"."Skill" DROP CONSTRAINT "Skill_pkey",
ADD COLUMN     "industryId" INTEGER,
ADD COLUMN     "isCustom" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "roleId" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Skill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."UserAssessment" DROP CONSTRAINT "UserAssessment_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "industryId",
ADD COLUMN     "industryId" INTEGER NOT NULL,
DROP COLUMN "roleId",
ADD COLUMN     "roleId" INTEGER NOT NULL,
ADD CONSTRAINT "UserAssessment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."industries" DROP CONSTRAINT "industries_pkey",
ADD COLUMN     "isCustom" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "industries_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."skill_assessments" DROP CONSTRAINT "skill_assessments_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "assessmentId",
ADD COLUMN     "assessmentId" INTEGER NOT NULL,
DROP COLUMN "skillId",
ADD COLUMN     "skillId" INTEGER NOT NULL,
ADD CONSTRAINT "skill_assessments_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_industryId_key" ON "public"."Role"("name", "industryId");

-- CreateIndex
CREATE INDEX "Skill_industryId_idx" ON "public"."Skill"("industryId");

-- CreateIndex
CREATE INDEX "Skill_roleId_idx" ON "public"."Skill"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_industryId_roleId_key" ON "public"."Skill"("name", "industryId", "roleId");

-- CreateIndex
CREATE INDEX "skill_assessments_skillId_idx" ON "public"."skill_assessments"("skillId");

-- CreateIndex
CREATE UNIQUE INDEX "skill_assessments_assessmentId_skillId_key" ON "public"."skill_assessments"("assessmentId", "skillId");

-- AddForeignKey
ALTER TABLE "public"."Role" ADD CONSTRAINT "Role_industryId_fkey" FOREIGN KEY ("industryId") REFERENCES "public"."industries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Skill" ADD CONSTRAINT "Skill_industryId_fkey" FOREIGN KEY ("industryId") REFERENCES "public"."industries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Skill" ADD CONSTRAINT "Skill_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RoleSkill" ADD CONSTRAINT "RoleSkill_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RoleSkill" ADD CONSTRAINT "RoleSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "public"."Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserAssessment" ADD CONSTRAINT "UserAssessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserAssessment" ADD CONSTRAINT "UserAssessment_industryId_fkey" FOREIGN KEY ("industryId") REFERENCES "public"."industries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserAssessment" ADD CONSTRAINT "UserAssessment_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."skill_assessments" ADD CONSTRAINT "skill_assessments_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "public"."UserAssessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."skill_assessments" ADD CONSTRAINT "skill_assessments_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "public"."Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
