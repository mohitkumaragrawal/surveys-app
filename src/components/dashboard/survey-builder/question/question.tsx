"use client";

import type { QuestionSchema } from "./question-schema";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import DeleteConfirm from "@/components/delete-confirm";
import QuestionSheet from "./question-sheet";

import * as actions from "./actions";

import { experimental_useOptimistic as useOptimistic } from "react";

type Props = QuestionSchema & {
  id: string;
  surveyId: string;
  groupId: string;
  order: number;

  optimisticMoveUp: (id: string) => void;
  optimisticMoveDown: (id: string) => void;
  optimisticDelete: (id: string) => void;
};

export default function Question(props: Props) {
  const [data, setData] = useOptimistic(
    {
      title: props.title,
      description: props.description,
      type: props.type,
      required: props.required,
    },
    (state, data: QuestionSchema) => {
      return data;
    }
  );

  async function moveUp() {
    props.optimisticMoveUp(props.id);

    await actions.moveUp({
      id: props.id,
      groupId: props.groupId,
      order: props.order,
      surveyId: props.surveyId,
    });
  }

  async function moveDown() {
    props.optimisticMoveDown(props.id);

    await actions.moveDown({
      id: props.id,
      groupId: props.groupId,
      order: props.order,
      surveyId: props.surveyId,
    });
  }

  async function deleteQuestion() {
    props.optimisticDelete(props.id);

    await actions.deleteQuestion(props.id, props.surveyId);
  }

  async function editQuestion(data: QuestionSchema) {
    setData(data);
    await actions.editQuestion(props.id, props.surveyId, data);
  }

  return (
    <div className="border rounded p-4 my-2 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">
          {data.title}
          <span className="text-red-500">{data.required && "*"}</span>
          <span className="text-muted-foreground text-sm"> ({data.type})</span>
        </h3>
        <h4 className="text-muted-foreground">{data.description}</h4>
        <div className="mt-4">
          <QuestionSheet
            action={editQuestion}
            title="Edit Question"
            defaultValues={{
              title: data.title,
              description: data.description,
              type: data.type,
              required: data.required,
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
