import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

// ref: https://next-auth.js.org/getting-started/typescript
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
  }

  interface User {}
  interface Account {}
  interface Profile {}
}

declare module "next-auth/jwt" {
  interface JWT {}
}
