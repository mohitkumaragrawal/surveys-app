import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { redirect } from "next/navigation";
import { ReactNode } from "react";

import ActiveLink from "@/components/active-link";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/");
  }

  return (
    <>
      <div className="max-w-sm m-auto my-8 flex">
        <ActiveLink link="/auth/signin">Sign in</ActiveLink>
        <ActiveLink link="/auth/signup">Sign up</ActiveLink>
      </div>
      {children}
    </>
  );
}
