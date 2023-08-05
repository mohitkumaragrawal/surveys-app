"use client";

import { useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";

interface Props {
  questionIds: Array<{
    id: string;
    required: boolean;
  }>;
  handleSubmit: any;
}

export default function SuveySubmit({ questionIds, handleSubmit }: Props) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const submit = () => {
    // toast({
    //   title: "Submitting...",
    // });
    const response: { [questionId: string]: string } = {};

    let check = true;
    for (let question of questionIds) {
      const data = localStorage.getItem(question.id);
      if (data) {
        response[question.id] = data;
      } else if (question.required) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please fill out all required questions",
        });
        check = false;
        break;
      }
    }
    if (check) {
      startTransition(async () => {
        await handleSubmit(response);
      });
    }
  };

  return (
    <Button onClick={submit} disabled={isPending} className="mt-10">
      Submit Response
    </Button>
  );
}
