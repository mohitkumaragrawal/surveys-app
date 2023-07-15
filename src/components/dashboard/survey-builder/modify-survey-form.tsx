"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import modifySurveyAction from "./modify-survey-action";

export const surveySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

type SurveySchema = z.infer<typeof surveySchema>;

interface Props {
  id: string;
  title: string;
  description: string;
}

export default function ModifySurveyForm({ id, title, description }: Props) {
  const [editing, setEditing] = useState(false);

  const form = useForm<SurveySchema>({
    defaultValues: {
      id,
      title,
      description,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Survey Headers</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form
          className="mt-4"
          onSubmit={() => setEditing(false)}
          action={modifySurveyAction}
        >
          <CardContent>
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => <input {...field} className="hidden" />}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your title"
                      {...field}
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your description"
                      {...field}
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex flex-row-reverse">
            <Button type="submit" className={!editing ? "hidden" : ""}>
              Save Changes
            </Button>

            <Button
              type="button"
              className={editing ? "hidden" : ""}
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
