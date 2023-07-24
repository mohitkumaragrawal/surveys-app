import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import SurveyInput from "@/components/survey/survey-input";
import SuveySubmit from "@/components/survey/survey-submit";

export default async function SurveyPage(props: { params: { id: string } }) {
  const surveyId = props.params.id;

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    const callbackUrl = `${process.env.NEXTAUTH_URL}/survey/${surveyId}`;
    const url = `/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`;
    return redirect(url);
  }

  const survey = await prisma.survey.findUnique({
    where: { id: surveyId },
    include: {
      SurveyGroup: {
        orderBy: { order: "asc" },
        include: {
          Question: {
            orderBy: { order: "asc" },
            include: {
              Answer: {
                where: { userId: session.user.id },
              },
            },
          },
        },
      },
    },
  });

  // generate all the question ids
  const questions = [];
  survey.SurveyGroup.forEach((group) => {
    group.Question.forEach((question) => {
      questions.push(question.id);
    });
  });

  async function handleSubmit(response: { [questionId: string]: string }) {
    "use server";

    const userId = session.user.id;

    let success = false;
    try {
      await Promise.all(
        Object.entries(response).map(async ([questionId, value]) => {
          const answer = await prisma.answer.findUnique({
            where: { userId_questionId: { userId, questionId } },
          });

          if (answer) {
            await prisma.answer.update({
              where: { userId_questionId: { questionId, userId } },
              data: { value },
            });
          } else {
            await prisma.answer.create({
              data: {
                value,
                questionId,
                userId,
              },
            });
          }
        })
      );

      const result = await prisma.userReponse.findUnique({
        where: { userId_surveyId: { userId, surveyId } },
      });
      if (!result) {
        await prisma.userReponse.create({
          data: {
            userId,
            surveyId,
          },
        });
      }

      success = true;
    } catch (e) {
      success = false;
    }

    if (success) {
      return redirect(`/survey/${surveyId}/success`);
    } else {
      return redirect(`/survey/${surveyId}/failed`);
    }
  }

  if (!survey) {
    return (
      <div className="text-center text-2xl font-semibold my-7">
        Survey not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 my-10">
      <h1 className="text-4xl font-bold mb-1">{survey.title}</h1>
      <h2 className="text-xl font-semibold mb-6 text-muted-foreground">
        {survey.description}
      </h2>

      {survey.SurveyGroup.map((group) => (
        <Card key={group.id} className="space-y-3 my-3">
          <CardHeader>
            <div className="flex flex-col gap-2">
              <CardTitle>{group.title}</CardTitle>
              <div className="text-sm text-muted-foreground">
                {group.description}
              </div>

              <div className="flex flex-col gap-6 my-6 mx-4">
                {group.Question.map((question) => (
                  <div key={question.id} className="flex flex-col gap-1">
                    <div className="text-lg font-semibold">
                      {question.title}
                      <span className="text-red-500">
                        {question.required && "*"}
                      </span>
                    </div>
                    <SurveyInput
                      placeholder={question.description}
                      questionId={question.id}
                      defaultValue={
                        question.Answer.length > 0
                          ? question.Answer[0].value
                          : ""
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}

      <SuveySubmit questionIds={questions} handleSubmit={handleSubmit} />
    </div>
  );
}
