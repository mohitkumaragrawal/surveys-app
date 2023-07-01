import Profile from "./profile";
import ModeToggle from "./mode-toggle";

export function NavBar() {
  return (
    <nav className="border-b px-5 py-3 flex items-center justify-between">
      <span className="text-2xl font-bold">
        notes
        <span className="text-orange-400">app</span>
      </span>

      <div className="flex items-center gap-3">
        <ModeToggle />
        <Profile />
      </div>
    </nav>
  );
}
