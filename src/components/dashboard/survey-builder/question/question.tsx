import { PrismaClient } from "@prisma/client";
import type { QuestionSchema } from "./question-schema";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import DeleteConfirm from "@/components/delete-confirm";
import QuestionSheet from "./question-sheet";

type Props = QuestionSchema & {
  id: string;
  surveyId: string;
  groupId: string;
  order: number;
};

const prisma = new PrismaClient();

export default function Question(props: Props) {
  async function moveUp() {
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

  async function moveDown() {
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

  async function deleteQuestion() {
    "use server";
    await prisma.question.delete({ where: { id: props.id } });
    revalidatePath(`/dashboard/survey-builder/${props.surveyId}`);
  }

  async function editQuestion(data: QuestionSchema) {
    "use server";
    await prisma.question.update({
      where: { id: props.id },
      data,
    });
    revalidatePath(`/dashboard/survey-builder/${props.surveyId}`);
  }

  return (
    <div className="border rounded p-4 my-2 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">
          {props.title}
          <span className="text-red-500">{props.required && "*"}</span>
          <span className="text-muted-foreground text-sm"> ({props.type})</span>
        </h3>
        <h4 className="text-muted-foreground">{props.description}</h4>
        <div className="mt-4">
          <QuestionSheet
            action={editQuestion}
            title="Edit Question"
            defaultValues={{
              title: props.title,
              description: props.description,
              type: props.type,
              required: props.required,
            }}
          >
            <Button className="mr-2">Edit</Button>
          </QuestionSheet>
          <DeleteConfirm action={deleteQuestion}>
            <Button variant="destructive">Delete</Button>
          </DeleteConfirm>
        </div>
      </div>
      <div className="flex flex-col">
        <form action={moveUp}>
          <Button variant="ghost">
            <ArrowUp />
          </Button>
        </form>
        <form action={moveDown}>
          <Button variant="ghost">
            <ArrowDown />
          </Button>
        </form>
      </div>
    </div>
  );
}
