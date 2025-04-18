/*
  Warnings:

  - A unique constraint covering the columns `[dataId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dataId" TEXT;

-- CreateTable
CREATE TABLE "Data" (
    "id" TEXT NOT NULL,
    "stack" TEXT[],

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_dataId_key" ON "User"("dataId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "Data"("id") ON DELETE SET NULL ON UPDATE CASCADE;
