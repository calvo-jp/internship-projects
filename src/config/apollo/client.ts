import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

const authLink = setContext(async (request, originalContext) => {
  const session = await getSession();

  const context = {
    ...originalContext,
    headers: {
      ...originalContext.headers,
      Authorization:
        session && session.accessToken ? "Bearer " + session.accessToken : "",
    },
  };

  return context;
});

const link = new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT });
const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: from([authLink, link]),
  cache,
});

export default apolloClient;
