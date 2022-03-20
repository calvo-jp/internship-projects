import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

interface UserViaOAuth {
  name: string;
  email: string;
  image?: string;
  __auth_method__: "oauth";
}

interface UserViaCredential {
  __auth_method__: "credential";
}

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: UserViaOAuth | UserViaCredential;
  }
}

declare module "next-auth/jwt" {
  interface JWT {}
}
