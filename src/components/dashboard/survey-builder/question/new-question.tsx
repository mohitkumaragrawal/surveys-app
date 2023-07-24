import { PrismaClient } from "@prisma/client";

import questionSchema from "./question-schema";
import type { QuestionSchema } from "./question-schema";
import { revalidatePath } from "next/cache";
import QuestionSheet from "./question-sheet";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface Props {
  groupId: string;
  surveyId: string;
}

import prisma from "@/lib/prisma";

export default function NewQuestion({ groupId, surveyId }: Props) {
  async function addQuestion(data: QuestionSchema) {
    "use server";

    try {
      questionSchema.parse(data);

      await prisma.question.create({
        data: {
          title: data.title,
          description: data.description,
          type: data.type,
          required: data.required,
          group: {
            connect: {
              id: groupId,
            },
          },
        },
      });

      revalidatePath(`/dashboard/survey-builder/${surveyId}`);
    } catch (error) {}

    console.log(data);
  }

  return (
    <QuestionSheet
      action={addQuestion}
      defaultValues={{
        title: "",
        description: "",
        type: "text",
        required: true,
      }}
      title="Add Question"
    >
      <Button>
        <PlusIcon className="mr-2" />
        Add Question
      </Button>
    </QuestionSheet>
  );
}
