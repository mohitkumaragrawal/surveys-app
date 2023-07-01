import { ReactNode } from "react";
import { NavBar } from "./nav";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
