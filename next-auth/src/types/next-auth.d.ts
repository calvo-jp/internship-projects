import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      gender?: "male" | "female";
    };
    accessToken: string;
    refreshToken: string;
    [key: string]: any;
  }

  interface Account {
    // twitter API v1
    oauth_token?: string;
    oauth_token_secret?: string;
  }

  interface User {}
}

declare module "next-auth/jwt" {
  interface JWT {}
}
