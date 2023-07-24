import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
const Home = async () => {
  const session = await getServerSession(authOptions);

  const users = await prisma.user.findMany({ include: { accounts: true } });

  return (
    <div className="p-3">
      <p className="font-mono bg-muted whitespace-pre my-3 rounded p-4 overflow-auto">
        {JSON.stringify(session, null, 2)}
      </p>

      <h1 className="my-3 text-xl">Users</h1>

      <p className="font-mono bg-muted whitespace-pre my-3 rounded p-4 overflow-auto">
        {JSON.stringify(users, null, 2)}
      </p>

      <Button>Hello</Button>
    </div>
  );
};

export default Home;
