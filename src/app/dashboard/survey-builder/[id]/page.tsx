"use server";

import ModifySurveyForm from "@/components/dashboard/survey-builder/modify-survey-form";
import { PrismaClient } from "@prisma/client";

interface SurveyBuilderPageProps {
  params: {
    id: string;
  };
}

const prisma = new PrismaClient();

export default async function SurveyBuilderPage({
  params,
}: SurveyBuilderPageProps) {
  const survey = await prisma.survey.findUnique({ where: { id: params.id } });

  return (
    <div className="max-w-4xl mx-auto px-2 my-10">
      <h1 className="text-3xl font-bold mb-12">Modify Your Survey</h1>

      <ModifySurveyForm
        title={survey.title}
        description={survey.description}
        id={params.id}
      />
    </div>
  );
}
