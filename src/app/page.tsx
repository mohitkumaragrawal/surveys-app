import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = async () => {
  return (
    <>
      <div className="px-5">
        <section className="max-w-3xl mx-auto mt-[6rem]">
          <h1 className="text-5xl font-bold">
            Want to collect some data? <br />
          </h1>
          <h2 className="text-green-500 text-3xl font-semibold mt-2">
            You are in the right place!
          </h2>

          <p className="mt-4 text-lg">
            Welcome to our surveys application! With our user-friendly interface
            and intuitive design, gathering valuable insights has never been
            easier. Create, distribute, and analyze surveys effortlessly,
            allowing you to make data-driven decisions in no time
          </p>

          <Link href="/dashboard">
            <Button className="mt-9">Start a survey right now!</Button>
          </Link>
        </section>
      </div>
    </>
  );
};

export default Home;
