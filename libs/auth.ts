import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { PRISMA } from "./prisma";

export const GetLoggedInUser = async (): Promise<User | null> => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) return null;

  const user = await PRISMA.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  return user;
};

export const IsAdmin = async (): Promise<boolean> => {
  const user = await GetLoggedInUser();
  if (!user) return false;

  return user.role === "ADMIN";
}
