"use server";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import NewSurveyDialog from "./new-survey-dialog";
import Link from "next/link";

import prisma from "@/lib/prisma";
import CopyLinkButton from "./copy-link-button";

export default async function SurveySection() {
  const session = await getServerSession(authOptions);

  const surveys = await prisma.survey.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: "desc" },
    include: { UserReponse: true },
  });

  const getResponseMessage = (
    count: number,
    surveyId: string
  ): React.ReactNode => {
    let text = "";
    if (count === 0) {
      text = "no responses yet";
      return text;
    } else if (count === 1) {
      text = "1 response";
    } else {
      text = `${count} responses`;
    }

    return (
      <a
        href={`/api/download/${surveyId}`}
        download
        className="underline text-blue-500"
      >
        {text}
      </a>
    );
  };

  return (
    <Card className="max-w-3xl mx-auto my-[3rem]">
      <CardHeader className="flex flex-row justify-between items-center">
        <h2 className="text-2xl font-semibold">Your Surveys</h2>
        <NewSurveyDialog />
      </CardHeader>

      <CardContent>
        {surveys.length === 0 ? (
          <p className="text-sm">You have no surveys yet, create right now!</p>
        ) : null}

        {surveys.map((survey) => (
          <div className="px-4 py-4 border rounded m-5" key={survey.id}>
            <p className="text-xl font-bold">{survey.title}</p>
            <p className="text-sm text-muted-foreground">
              {survey.description}
            </p>

            <p className="font-semibold mt-3">
              You have got{" "}
              {getResponseMessage(survey.UserReponse.length, survey.id)}
            </p>

            <div className="flex mt-5 flex-row gap-4">
              <Link href={`/dashboard/survey-builder/${survey.id}`}>
                <Button>Edit</Button>
              </Link>
              <CopyLinkButton surveyId={survey.id} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
