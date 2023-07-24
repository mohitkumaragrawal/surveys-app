import GroupBuilder from "@/components/dashboard/survey-builder/group-builder";
import ModifySurveyForm from "@/components/dashboard/survey-builder/modify-survey-form";
import NewSurveyGroup from "@/components/dashboard/survey-builder/new-survey-group";
import DeleteConfirm from "@/components/delete-confirm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { DeleteIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface SurveyBuilderPageProps {
  params: {
    id: string;
  };
}
import prisma from "@/lib/prisma";

export default async function SurveyBuilderPage({
  params,
}: SurveyBuilderPageProps) {
  // guard
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    // un authenticated
    return redirect("/");
  }

  const survey = await prisma.survey.findUnique({ where: { id: params.id } });
  if (!survey || survey.userId !== session.user.id) {
    return redirect("/dashboard");
  }

  const groups = await prisma.surveyGroup.findMany({
    where: { surveyId: params.id },
    orderBy: { order: "asc" },
  });

  async function deleteSurvey() {
    "use server";

    const sess = await getServerSession(authOptions);
    if (!sess || !sess.user || sess.user.id !== survey.userId) {
      return;
    }

    await prisma.survey.delete({ where: { id: params.id } });
    revalidatePath("/dashboard");
    redirect("/dashboard");
  }

  return (
    <div className="max-w-4xl mx-auto px-6 my-10">
      <h1 className="text-3xl font-bold mb-12">Modify Your Survey</h1>

      <ModifySurveyForm
        title={survey.title}
        description={survey.description}
        id={params.id}
      />

      <div className="flex items-center flex-row justify-between">
        <h1 className="text-2xl font-semibold mt-12 mb-6">Survey Groups</h1>
        <NewSurveyGroup surveyId={params.id} />
      </div>
      {groups.length === 0 ? (
        <p className="text-muted-foreground">
          Your survey is currently empty, add a new group right now!
        </p>
      ) : (
        groups.map((group) => <GroupBuilder key={group.id} {...group} />)
      )}

      <div className="flex items-center flex-row justify-between">
        <h1 className="text-2xl font-semibold mt-12 mb-6">Danger Zone</h1>
      </div>

      <Card className="border-destructive pt-6">
        <CardContent className="flex flex-row justify-between">
          <div>
            <h1 className="text-xl font-semibold">Delete Survey</h1>
            <h2 className="text-destructive">
              This operations cannot be undone and it will delete all the
              responses of this survey too.
            </h2>
          </div>

          <DeleteConfirm action={deleteSurvey}>
            <Button variant="destructive" type="submit">
              <DeleteIcon className="mr-2" />
              Delete
            </Button>
          </DeleteConfirm>
        </CardContent>
      </Card>
    </div>
  );
}
