/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Project_studentId_key" ON "Project"("studentId");
