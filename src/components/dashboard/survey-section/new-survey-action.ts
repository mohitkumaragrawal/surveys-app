"use server";

import { revalidatePath } from "next/cache";
import formSchema from "./new-survey-form-schema";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import prisma from "@/lib/prisma";

export default async function newSurveyAction(data: FormData) {
  const title = data.get("title");
  const description = data.get("description");

  const session = await getServerSession(authOptions);

  if (!session.user || !session.user.id) {
    return;
  }

  try {
    formSchema.parse({ title, description });
    await prisma.survey.create({
      data: {
        title: title as string,
        description: description as string,
        userId: session.user.id,
      },
    });

    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
    return;
  }
}
