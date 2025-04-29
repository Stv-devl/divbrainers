/*
  Warnings:

  - You are about to drop the column `difficulty` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `interviewType` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfQuestions` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `stack` on the `Data` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Data` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_dataId_fkey";

-- AlterTable
ALTER TABLE "Data" DROP COLUMN "difficulty",
DROP COLUMN "interviewType",
DROP COLUMN "numberOfQuestions",
DROP COLUMN "position",
DROP COLUMN "stack",
ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "dataId" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "interviewType" TEXT NOT NULL,
    "numberOfQuestions" INTEGER NOT NULL,
    "stack" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Data_userId_key" ON "Data"("userId");

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "Data"("id") ON DELETE CASCADE ON UPDATE CASCADE;
