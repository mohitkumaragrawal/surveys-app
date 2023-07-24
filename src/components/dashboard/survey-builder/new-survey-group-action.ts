"use server";

import { PrismaClient } from "@prisma/client";
import newSurveyGroupSchema from "./new-survey-group-schema";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

export default async function newSurveyGroupAction(data: FormData) {
  const title = data.get("title") as string;
  const description = data.get("description") as string;
  const surveyId = data.get("surveyId") as string;

  try {
    newSurveyGroupSchema.parse({
      title,
      description,
      surveyId,
    });

    await prisma.surveyGroup.create({
      data: {
        title,
        description,
        survey: {
          connect: {
            id: surveyId,
          },
        },
      },
    });

    revalidatePath(`/dashboard/survey-builder/${surveyId}`);
  } catch (error) {
    console.log(error);
  }
}
