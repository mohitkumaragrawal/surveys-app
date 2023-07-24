/*
  Warnings:

  - A unique constraint covering the columns `[userId,questionId]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "UserReponse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "surveyId" TEXT NOT NULL,

    CONSTRAINT "UserReponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserReponse_userId_surveyId_key" ON "UserReponse"("userId", "surveyId");

-- CreateIndex
CREATE UNIQUE INDEX "Answer_userId_questionId_key" ON "Answer"("userId", "questionId");

-- AddForeignKey
ALTER TABLE "UserReponse" ADD CONSTRAINT "UserReponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReponse" ADD CONSTRAINT "UserReponse_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE CASCADE ON UPDATE CASCADE;
