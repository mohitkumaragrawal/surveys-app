"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { QuestionSchema } from "./question-schema";

interface MoveProps {
  id: string;
  groupId: string;
  order: number;
  surveyId: string;
}

export async function moveUp(props: MoveProps) {
  "use server";

  const otherQuestion = await prisma.question.findFirst({
    where: {
      surveyGroupId: props.groupId,
      order: { lt: props.order },
    },
    orderBy: { order: "desc" },
  });
  if (!otherQuestion) return;
  await prisma.question.update({
    where: { id: props.id },
    data: { order: otherQuestion.order },
  });
  await prisma.question.update({
    where: { id: otherQuestion.id },
    data: { order: props.order },
  });

  revalidatePath(`/dashboard/survey-builder/${props.surveyId}`);
}

export async function moveDown(props: MoveProps) {
  "use server";

  const otherQuestion = await prisma.question.findFirst({
    where: {
      surveyGroupId: props.groupId,
      order: { gt: props.order },
    },
    orderBy: { order: "asc" },
  });
  if (!otherQuestion) return;
  await prisma.question.update({
    where: { id: props.id },
    data: { order: otherQuestion.order },
  });
  await prisma.question.update({
    where: { id: otherQuestion.id },
    data: { order: props.order },
  });
  revalidatePath(`/dashboard/survey-builder/${props.surveyId}`);
}

export async function deleteQuestion(id: string, surveyId: string) {
  "use server";
  await prisma.question.delete({ where: { id: id } });
  revalidatePath(`/dashboard/survey-builder/${surveyId}`);
}

export async function editQuestion(
  id: string,
  surveyId: string,
  data: QuestionSchema
) {
  "use server";
  await prisma.question.update({
    where: { id: id },
    data,
  });
  revalidatePath(`/dashboard/survey-builder/${surveyId}`);
}
