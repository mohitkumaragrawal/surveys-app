"use client";

import Question from "./question";

import autoAnimate from "@formkit/auto-animate";
import {
  useRef,
  useEffect,
  experimental_useOptimistic as useOptimistic,
} from "react";

interface Props {
  groupId: string;
  surveyId: string;
  questions: Array<{
    id: string;
    description: string;
    required: boolean;
    title: string;
    type: any;
    order: number;
  }>;
}

export default function QuestionList(props: Props) {
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) autoAnimate(listRef.current);
  }, [listRef]);

  const [optimisticQuestions, optimisticQuestionsReducer] = useOptimistic(
    props.questions,
    (state, { type, id }: { type: "DELETE" | "UP" | "DOWN"; id: string }) => {
      let idx: number;
      let newState: {
        id: string;
        description: string;
        required: boolean;
        title: string;
        type: any;
        order: number;
      }[];

      switch (type) {
        case "DELETE":
          return state.filter((question) => question.id !== id);
        case "UP":
          idx = state.findIndex((question) => question.id === id);
          if (idx <= 0) return state;

          newState = [...state];
          newState[idx - 1] = state[idx];
          newState[idx] = state[idx - 1];
          return newState;

        case "DOWN":
          idx = state.findIndex((question) => question.id === id);
          if (idx + 1 >= state.length) return state;

          newState = [...state];
          newState[idx + 1] = state[idx];
          newState[idx] = state[idx + 1];
          return newState;
      }
    }
  );

  return (
    <ul className="list-none" ref={listRef}>
      {optimisticQuestions.map((question) => (
        <li key={question.id}>
          <Question
            {...question}
            groupId={props.groupId}
            surveyId={props.surveyId}
            optimisticDelete={() => {
              optimisticQuestionsReducer({
                type: "DELETE",
                id: question.id,
              });
            }}
            optimisticMoveDown={() => {
              optimisticQuestionsReducer({
                type: "DOWN",
                id: question.id,
              });
            }}
            optimisticMoveUp={() => {
              optimisticQuestionsReducer({
                type: "UP",
                id: question.id,
              });
            }}
          />
        </li>
      ))}
    </ul>
  );
}
