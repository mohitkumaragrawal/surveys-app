"use client";

import { Button } from "@/components/ui/button";

import { z } from "zod";

import questionSchema from "./question-schema";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";

type QuestionSchema = z.infer<typeof questionSchema>;

type Props = {
  action: (data: QuestionSchema) => void;
  children: React.ReactNode;
  defaultValues: QuestionSchema;
  title: string;
};

export default function QuestionSheet({
  action,
  children,
  defaultValues,
  title,
}: Props) {
  const [open, setOpen] = useState(false);
  const [waiting, startTransition] = useTransition();

  const form = useForm<QuestionSchema>({
    resolver: zodResolver(questionSchema),
    defaultValues,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setOpen(false);

    startTransition(() => {
      action(form.getValues());
      form.reset({ title: "", description: "", type: "text", required: false });
    });

    form.reset(defaultValues);
  };

  useEffect(() => {
    if (!open) form.reset(defaultValues);
  }, [open, form, defaultValues]);

  return (
    <Sheet open={open} onOpenChange={(e) => setOpen(e)}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="overflow-auto">
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <SheetHeader>
              <SheetTitle>{title}</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col space-y-4 mt-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your question title"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Short title of the question
                    </FormDescription>
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
                      <Input
                        placeholder="Enter your question description"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Additional details of the question
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(e) => field.onChange(e as any)}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose the type of the question" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="radio">Radio</SelectItem>
                          <SelectItem value="checkbox">Checkbox</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Choose the type of the question
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="required"
                render={({ field }) => (
                  <FormItem className="flex flex-row justify-between pdd-4">
                    <div>
                      <FormLabel>Required</FormLabel>
                      <FormDescription>
                        Is this question required?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <SheetFooter>
              <Button className="mt-4">Confirm</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
