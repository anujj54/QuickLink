import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { authOptions } from "@/server/auth";
import CreateClient from "./CreateClient";

export default async function CreatePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <CreateClient />;
}