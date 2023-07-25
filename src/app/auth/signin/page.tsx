"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { FcGoogle } from "react-icons/fc";
import { Separator } from "@/components/ui/separator";

import { signIn } from "next-auth/react";

interface Props {
  searchParams?: {
    callbackUrl?: string;
  };
}

export default function SigninPage(props: Props) {
  let callbackUrl = props.searchParams?.callbackUrl;
  if (!callbackUrl) {
    callbackUrl = process.env.NEXTAUTH_URL;
  }

  return (
    <Card className="max-w-sm m-auto my-8">
      <CardHeader className="font-bold text-2xl">Sign in</CardHeader>
      <CardContent>
        <p>Signin please</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {/* <Button variant="secondary" className="w-full">
          Sign in
        </Button> */}

        <Separator className="my-3" />

        <Button
          variant="outline"
          className="w-full bg-opacity-80 bg-white justify-start hover:bg-slate-200"
          onClick={() => signIn("google", { callbackUrl })}
        >
          <FcGoogle className="mr-2 w-6 h-6" />
          <span className="flex-1 text-center text-black">
            Sign in with Google
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}
