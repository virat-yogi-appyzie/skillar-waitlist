/*
  Warnings:

  - You are about to drop the column `roleId` on the `UserAssessment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserAssessment" DROP CONSTRAINT "UserAssessment_roleId_fkey";

-- AlterTable
ALTER TABLE "UserAssessment" DROP COLUMN "roleId";

-- CreateTable
CREATE TABLE "UserAssessmentRole" (
    "assessmentId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "UserAssessmentRole_pkey" PRIMARY KEY ("assessmentId","roleId")
);

-- AddForeignKey
ALTER TABLE "UserAssessmentRole" ADD CONSTRAINT "UserAssessmentRole_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "UserAssessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAssessmentRole" ADD CONSTRAINT "UserAssessmentRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
