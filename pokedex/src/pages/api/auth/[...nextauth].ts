import apolloClient from "config/apollo/client";
import { AUTHENTICATE } from "graphql/auth-api/mutations/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";
import TwitterProvider from "next-auth/providers/twitter";
import * as yup from "yup";
import {
  Authenticate,
  AuthenticateVariables,
} from "__generated__/Authenticate";

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID!,
      clientSecret: process.env.TWITTER_SECRET!,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID!,
      clientSecret: process.env.LINKEDIN_SECRET!,
    }),
    CredentialsProvider({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials) return null;

        const data = await loginSchema.validate(credentials);
        const accessToken = await authenticate(data);

        return !!accessToken ? { accessToken } : null;
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) token.accessToken = user.accessToken;

      return token;
    },
    async session({ token, session }) {
      return { ...session, ...token };
    },
  },
  pages: {
    signIn: "/login",
  },
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).max(100).required(),
});

const authenticate = async (credentials: yup.InferType<typeof loginSchema>) => {
  const result = await apolloClient.mutate<Authenticate, AuthenticateVariables>(
    { mutation: AUTHENTICATE, variables: credentials }
  );

  return !result.errors && !!result.data
    ? result.data.authenticate.token
    : null;
};
