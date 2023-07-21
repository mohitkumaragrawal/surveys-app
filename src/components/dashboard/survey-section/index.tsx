"use server";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import NewSurveyDialog from "./new-survey-dialog";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function SurveySection() {
  const session = await getServerSession(authOptions);

  const surveys = await prisma.survey.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <h2 className="text-2xl font-semibold">Your Surveys</h2>
        <NewSurveyDialog />
      </CardHeader>

      <CardContent>
        {surveys.length === 0 ? (
          <p className="text-sm">You have no surveys yet, create right now!</p>
        ) : null}

        {surveys.map((survey) => (
          <Link href={`/dashboard/survey-builder/${survey.id}`} key={survey.id}>
            <Button
              variant="secondary"
              className="p-8 py-12 flex flex-col m-4 text-left items-start space-y-1 w-full"
            >
              <p className="text-xl">{survey.title}</p>
              <p className="text-sm space-y-2">{survey.description}</p>
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
