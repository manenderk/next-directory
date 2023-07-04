import { PRISMA } from "@/libs/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import EmailProvider from "next-auth/providers/email";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(PRISMA),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
