import apolloClient from "config/apollo/client";
import { AUTHENTICATE, SIGN_UP } from "graphql/auth-api/mutations/auth";
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
import { SignUp, SignUpVariables } from "__generated__/SignUp";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).max(100).required(),
});

const signupSchema = loginSchema.shape({
  firstName: yup.string().min(3).max(50).required(),
  lastName: yup.string().min(3).max(50).required(),
});

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
      credentials: { email: {}, password: {}, lastName: {}, firstName: {} },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          let accessToken: string | null;

          if (credentials.firstName) {
            const data = await signupSchema.validate(credentials);
            accessToken = await signup(data);
          } else {
            const data = await loginSchema.validate(credentials);
            accessToken = await authenticate(data);
          }

          if (!!accessToken) return { accessToken };
        } catch {}

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) token.accessToken = user.accessToken;
      return token;
    },
    async session({ token, session }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

const authenticate = async (credentials: yup.InferType<typeof loginSchema>) => {
  const result = await apolloClient.mutate<Authenticate, AuthenticateVariables>(
    { mutation: AUTHENTICATE, variables: credentials }
  );

  return !result.data ? null : result.data.authenticate.token;
};

const signup = async (credentials: yup.InferType<typeof signupSchema>) => {
  const result = await apolloClient.mutate<SignUp, SignUpVariables>({
    mutation: SIGN_UP,
    variables: credentials,
  });

  return !result.data ? null : result.data.signUp.token;
};
