-- DropForeignKey
ALTER TABLE "SurveyGroup" DROP CONSTRAINT "SurveyGroup_surveyId_fkey";

-- AddForeignKey
ALTER TABLE "SurveyGroup" ADD CONSTRAINT "SurveyGroup_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE CASCADE ON UPDATE CASCADE;
