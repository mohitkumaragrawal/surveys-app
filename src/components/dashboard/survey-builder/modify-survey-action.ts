"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

export default async function modifySurveyAction(data: FormData) {
  "use server";
  const title = data.get("title") as string;
  const description = data.get("description") as string;
  const id = data.get("id") as string;

  try {
    await prisma.survey.update({
      where: {
        id,
      },
      data: {
        title,
        description,
      },
    });

    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
  }
}
