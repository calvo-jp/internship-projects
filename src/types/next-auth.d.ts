import { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      gender?: "male" | "female";
    } & DefaultSession["user"];
    accessToken?: string;
  }

  interface Account {
    oauth_token?: string;
    oauth_token_secret?: string;
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
  }
}
