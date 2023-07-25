import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { surveyId: string } }
) {
  const surveyId = params.surveyId;
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const survey = await prisma.survey.findUnique({
    where: { id: surveyId },
    include: {
      SurveyGroup: {
        include: {
          Question: {
            include: {
              Answer: true,
            },
            orderBy: {
              order: "asc",
            },
          },
        },
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (survey.userId !== session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let questions = [];
  for (const group of survey.SurveyGroup) {
    for (const question of group.Question) {
      questions.push(question);
    }
  }

  const response = await prisma.userReponse.findMany({
    where: {
      surveyId: surveyId,
    },
    include: {
      user: true,
    },
  });

  let data = [];

  // first push the header
  let header = ["Name", "Email"];
  for (const question of questions) {
    header.push(question.title);
  }
  data.push(header);

  // then push the data

  for (const res of response) {
    let row = [];

    row.push(res.user.name);
    row.push(res.user.email);

    for (const question of questions) {
      let ok = false;
      for (const answer of question.Answer) {
        if (answer.userId === res.userId) {
          row.push(answer.value);
          ok = true;
          break;
        }
      }

      if (!ok) row.push("");
    }

    data.push(row);
  }

  let fileData: string = "";

  for (const row of data) {
    fileData += row.join(",") + "\n";
  }

  const blob = new Blob([fileData], { type: "text/csv" });
  return new Response(blob, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename=${survey.title}.csv`,
    },
  });
}
