"use client";

import { useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";

interface Props {
  questionIds: string[];
  handleSubmit: any;
}

export default function SuveySubmit({ questionIds, handleSubmit }: Props) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const submit = () => {
    toast({
      title: "Submitting...",
    });
    startTransition(async () => {
      const response: { [questionId: string]: string } = {};
      questionIds.forEach((questionId) => {
        const data = localStorage.getItem(questionId);
        if (data) {
          response[questionId] = data;
        }
      });

      await handleSubmit(response);
    });
  };

  return (
    <Button onClick={submit} disabled={isPending} className="mt-10">
      Submit Response
    </Button>
  );
}
