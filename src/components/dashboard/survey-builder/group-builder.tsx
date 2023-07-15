import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteIcon, EditIcon } from "lucide-react";
import EditSurveyGroup from "./edit-survey-group";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface Props {
  id: string;
  title: string;
  description: string;
  surveyId: string;
}

const prisma = new PrismaClient();

export default function GroupBuilder({
  id,
  title,
  description,
  surveyId,
}: Props) {
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
        <CardTitle>{title}</CardTitle>

        <div className="flex flex-row gap-2">
          <EditSurveyGroup
            surveyGroupId={id}
            title={title}
            description={description}
          />
          <form action={deleteThis}>
            <Button type="submit" variant="destructive" className="ml-2">
              <DeleteIcon className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
