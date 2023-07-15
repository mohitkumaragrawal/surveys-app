"use client";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import { usePathname } from "next/navigation";

type ActiveLinkProps = {
  link: string;
  children: React.ReactNode;
};

export default function ActiveLink({ link, children }: ActiveLinkProps) {
  const pathname = usePathname();
  const active = pathname === link;

  return (
    <Link href={link} className="w-full">
      <Button variant={active ? "secondary" : "outline"} className="w-full">
        {children}
      </Button>
    </Link>
  );
}
