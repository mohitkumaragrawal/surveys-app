"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { z } from "zod";

import newSurveyActionSchema from "./new-survey-group-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import newSurveyGroupAction from "./new-survey-group-action";
import { useState } from "react";
type NewSurveyGroupSchema = z.infer<typeof newSurveyActionSchema>;

interface Props {
  surveyId: string;
}

export default function NewSurveyGroup({ surveyId }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<NewSurveyGroupSchema>({
    resolver: zodResolver(newSurveyActionSchema),
    defaultValues: {
      title: "",
      description: "hola",
      surveyId: surveyId,
    },
  });

  const handleSubmit = () => {
    setOpen(false);
    form.reset({ title: "", description: "", surveyId });
  };

  return (
    <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="h-6 w-6 mr-2" />
          New
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form action={newSurveyGroupAction} onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>New Survey Group</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col space-y-4">
              <FormField
                name="surveyId"
                render={({ field }) => (
                  <input {...field} value={surveyId} className="hidden" />
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button className="mt-4">Confirm</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
