import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";
import TwitterProvider from "next-auth/providers/twitter";

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
    CredentialProvider({
      credentials: { email: { type: "email" }, password: { type: "password" } },
      async authorize(credentials) {
        return credentials ? await callExternalAPI(credentials) : null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // using credential
      // store user data and original jwt for client use
      // will be passed down to Session.token.user
      if (user) {
        token.user = user;
        token.accessToken = user.accessToken;
      }

      // using 3rd party
      if (account) {
        // facebook and linkedin
        if (account.access_token) token.accessToken = account.access_token;
        if (account.refresh_token) token.refreshToken = account.refresh_token;
        // twitter API v1
        if (account.oauth_token) token.accessToken = account.oauth_token;
        if (account.oauth_token_secret)
          token.refreshToken = account.oauth_token_secret;
      }

      return token;
    },
    async session({ session, token }) {
      // save user to session for client access
      if (token.user) session.user = token.user as any;
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

type Credential = Record<"email" | "password", string>;

const callExternalAPI = async (credential: Credential) => {
  return {
    name: "John Doe",
    email: "johndoe@gmail.com",
    gender: "male",
    accessToken: "accessTokenGeneratedFromExternalAPI",
    refreshToken: "accessTokenGeneratedFromExternalAPI",
  };
};
