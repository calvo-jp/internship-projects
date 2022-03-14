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
        return credentials ? await getUserFromBackend(credentials) : null;
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
        // twitter
        if (account.oauth_token) token.accessToken = account.oauth_token;
        if (account.oauth_token_secret)
          token.refreshToken = account.oauth_token_secret;
      }

      return token;
    },
    async session({ session, token }) {
      // save user to session for client access
      if (token.user) session.user = token.user as Record<string, any>;

      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

const getUserFromBackend = async ({
  email,
  password,
}: Record<"email" | "password", string>) => {
  if (email === "johndoe@dum.my" && password === "password") {
    return {
      name: "john doe",
      email,
      gender: "male",
      accessToken: "accessTokenGeneratedFromBackendServer",
    };
  }

  return null;
};
