import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDown, ArrowUp, DeleteIcon, PlusIcon } from "lucide-react";
import EditSurveyGroup from "./edit-survey-group";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import NewQuestion from "./question/new-question";
import DeleteConfirm from "@/components/delete-confirm";
import Question from "./question/question";

interface Props {
  id: string;
  title: string;
  description: string;
  surveyId: string;
}

const prisma = new PrismaClient();

function MoveButtons({ groupId }: { groupId: string }) {
  async function moveUp() {
    "use server";
    const group = await prisma.surveyGroup.findUnique({
      where: { id: groupId },
    });
    const otherGroup = await prisma.surveyGroup.findFirst({
      where: {
        surveyId: group.surveyId,
        order: { lt: group.order },
      },
      orderBy: { order: "desc" },
    });
    if (!otherGroup) return;
    await prisma.surveyGroup.update({
      where: { id: group.id },
      data: { order: otherGroup.order },
    });
    await prisma.surveyGroup.update({
      where: { id: otherGroup.id },
      data: { order: group.order },
    });
    revalidatePath(`/dashboard/survey-builder/${group.surveyId}`);
  }

  async function moveDown() {
    "use server";
    const group = await prisma.surveyGroup.findUnique({
      where: { id: groupId },
    });
    const otherGroup = await prisma.surveyGroup.findFirst({
      where: {
        surveyId: group.surveyId,
        order: { gt: group.order },
      },
      orderBy: { order: "asc" },
    });
    if (!otherGroup) return;
    await prisma.surveyGroup.update({
      where: { id: group.id },
      data: { order: otherGroup.order },
    });
    await prisma.surveyGroup.update({
      where: { id: otherGroup.id },
      data: { order: group.order },
    });
    revalidatePath(`/dashboard/survey-builder/${group.surveyId}`);
  }

  return (
    <>
      <form action={moveUp}>
        <Button variant="outline">
          <ArrowUp />
        </Button>
      </form>
      <form action={moveDown}>
        <Button variant="outline">
          <ArrowDown />
        </Button>
      </form>
    </>
  );
}

export default async function GroupBuilder({
  id,
  title,
  description,
  surveyId,
}: Props) {
  const questions = await prisma.question.findMany({
    where: {
      surveyGroupId: id,
    },
    orderBy: {
      order: "asc",
    },
  });

  async function deleteThis() {
    "use server";
    await prisma.surveyGroup.delete({
      where: {
        id: id,
      },
    });
    revalidatePath(`/dashboard/survey-builder/${surveyId}`);
  }

  return (
    <Card className="my-3">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>{title}</CardTitle>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>

        <div className="flex flex-row gap-2">
          <EditSurveyGroup
            surveyGroupId={id}
            title={title}
            description={description}
          />
          <DeleteConfirm action={deleteThis}>
            <Button type="submit" variant="destructive" className="ml-2">
              <DeleteIcon className="w-5 h-5" />
            </Button>
          </DeleteConfirm>
        </div>
      </CardHeader>
      <CardContent>
        {questions.length === 0 ? (
          <p className="text-muted-foreground">
            This group is currently empty, add a new question right now!
          </p>
        ) : (
          questions.map((question) => (
            <Question
              key={question.id}
              surveyId={surveyId}
              groupId={id}
              id={question.id}
              description={question.description}
              required={question.required}
              title={question.title}
              type={question.type as any}
              order={question.order}
            />
          ))
        )}
      </CardContent>
      <CardFooter className="gap-5">
        <NewQuestion groupId={id} surveyId={surveyId} />
        <MoveButtons groupId={id} />
      </CardFooter>
    </Card>
  );
}
