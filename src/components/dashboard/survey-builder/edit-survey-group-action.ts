"use server";

import { PrismaClient } from "@prisma/client";
import editSurveyGroupSchema from "./edit-survey-group-schema";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

export default async function editSurveyGroupAction(data: FormData) {
  const surveyGroupId = data.get("surveyGroupId") as string;
  const title = data.get("title") as string;
  const description = data.get("description") as string;

  try {
    editSurveyGroupSchema.parse({ surveyGroupId, title, description });

    await prisma.surveyGroup.update({
      where: { id: surveyGroupId },
      data: { title, description },
    });

    revalidatePath("/dashboard/survey-builder/[id]");
  } catch (error) {
    console.log(error);
  }
}
