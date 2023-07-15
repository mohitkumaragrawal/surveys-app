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
import { EditIcon, PlusIcon } from "lucide-react";
import { z } from "zod";

import editSurveyActionSchema from "./edit-survey-group-schema";
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
import editSurveyGroupAction from "./edit-survey-group-action";
import { useEffect, useState } from "react";
type EditSurveyGroupSchema = z.infer<typeof editSurveyActionSchema>;

interface Props {
  surveyGroupId: string;
  title: string;
  description: string;
}

export default function EditSurveyGroup({
  title,
  description,
  surveyGroupId,
}: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<EditSurveyGroupSchema>({
    resolver: zodResolver(editSurveyActionSchema),
    defaultValues: {
      title: title,
      description: description,
      surveyGroupId: surveyGroupId,
    },
  });

  useEffect(() => {
    form.reset({ title, description, surveyGroupId });
  }, [title, description, surveyGroupId, form]);

  const handleSubmit = () => {
    setOpen(false);
    form.reset({ title: "", description: "", surveyGroupId });
  };

  return (
    <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <EditIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form action={editSurveyGroupAction} onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Survey Group</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col space-y-4">
              <FormField
                name="surveyGroupId"
                render={({ field }) => (
                  <input {...field} value={surveyGroupId} className="hidden" />
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
