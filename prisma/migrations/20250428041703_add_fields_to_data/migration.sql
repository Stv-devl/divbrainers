/*
  Warnings:

  - Added the required column `difficulty` to the `Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interviewType` to the `Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfQuestions` to the `Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Data" ADD COLUMN     "difficulty" TEXT NOT NULL,
ADD COLUMN     "interviewType" TEXT NOT NULL,
ADD COLUMN     "numberOfQuestions" INTEGER NOT NULL,
ADD COLUMN     "position" TEXT NOT NULL;
