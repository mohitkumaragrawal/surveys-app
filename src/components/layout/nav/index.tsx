import Profile from "./profile";
import ModeToggle from "./mode-toggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function NavBar() {
  const session = await getServerSession(authOptions);
  const status = session && session.user ? "authenticated" : "unauthenticated";

  return (
    <nav className="border-b px-5 py-3 flex items-center justify-between">
      <span className="text-2xl font-bold">
        surveys
        <span className="text-orange-400">app</span>
      </span>

      <div className="flex items-center gap-3">
        <ModeToggle />
        <Profile session={session} status={status} />
      </div>
    </nav>
  );
}
