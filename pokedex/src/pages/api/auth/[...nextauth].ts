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

        const data = await schema.validate(credentials);
        const accessToken = await authenticate(data);

        return !!accessToken ? { accessToken } : null;
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token, account, profile }) {
      if (account) {
        // store provider profile to user object
        if (account.type === "oauth") {
          token.accessToken = account.access_token || account.oauth_token;

          // facebook: id, name, email, picture.data.url
          // twitter: id, name, email, profile_image_url
          // linkedin: id, localizedFirstName, localizedLastName,

          token.user = {
            name: token.name,
            email: token.email,
            image: token.picture,

            // the "__auth_method__" prop will serve as a type-guard
            // and will mostly be used in the client
            // see next-auth.d.ts

            __auth_method__: "oauth",
          };
        }

        // for credentials,
        // profile details will be fetched in the client side
        // to obtain the most updated info
        if (account.type === "credentials" && user) {
          token.accessToken = user.accessToken;
          token.user = {
            __auth_method__: "credential",
          };
        }
      }

      return token;
    },
    async session({ token, session }) {
      session.user = token.user as any;
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).max(100).required(),
});

const authenticate = async (credentials: yup.InferType<typeof schema>) => {
  const result = await apolloClient.mutate<Authenticate, AuthenticateVariables>(
    { mutation: AUTHENTICATE, variables: credentials }
  );

  return !result.errors && !!result.data
    ? result.data.authenticate.token
    : null;
};
