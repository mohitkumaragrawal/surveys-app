-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "order" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "QuestionOptions" ADD COLUMN     "order" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Survey" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "SurveyGroup" ADD COLUMN     "order" SERIAL NOT NULL;
