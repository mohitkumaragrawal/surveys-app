"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTransition } from "react";

interface Props {
  children: React.ReactNode;
  action: any;
  title?: string;
  description?: string;
}

export default function DeleteConfirm(props: Props) {
  const [waiting, startTransition] = useTransition();

  const handleAction = () => {
    startTransition(() => {
      props.action();
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{props.children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {props.title || "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {props.description ||
              "This action is dangerous and cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
