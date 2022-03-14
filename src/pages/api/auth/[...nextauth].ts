import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";
import TwitterProvider from "next-auth/providers/twitter";

export default NextAuth({
  providers: [
    CredentialProvider({
      type: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials, request) {
        if (credentials) {
          const { email, password } = credentials;

          if (email === "admin@gmail.com" && password === "admin") {
            return {
              name: "john doe",
              email: "johndoe@dummy.co",
              accessToken: "accessTokenGeneratedFromBackendServer",
            };
          }
        }

        return null;
      },
    }),
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
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // credentials
      if (user) token.accessToken = user.accessToken;

      if (account) {
        // facebook and linkedin
        if (account.access_token) token.accessToken = account.access_token;
        if (account.refresh_token) token.refreshToken = account.refresh_token;
        // used by twitter
        if (account.oauth_token) token.accessToken = account.oauth_token;
        if (account.oauth_token_secret)
          token.refreshToken = account.oauth_token_secret;
      }

      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
