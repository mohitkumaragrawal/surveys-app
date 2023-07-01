"use client";

/* eslint-disable @next/next/no-img-element */
import { useSession, signOut } from "next-auth/react";
import { Loader2, LogOut } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    return (
      <div>
        <Link href="/api/auth/signin">
          <Button variant="outline">Login</Button>
        </Link>
      </div>
    );
  }

  if (status === "loading") {
    // Maybe add a loading spinner
    return <Loader2 className="animate-spin" />;
  }

  const handleLogout = () => {
    signOut();
  };

  if (status === "authenticated") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <img
              src={session?.user?.image ?? ""}
              alt="profile imge"
              className="h-full w-full object-cover"
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            Hi {session?.user?.name?.split(" ")[0]}!
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-3" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
