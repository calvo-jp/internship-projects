import { ApolloLink, from, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

const authLink = setContext(async (_, originalContext) => {
  const session = await getSession();

  if (!session) return originalContext;

  return {
    ...originalContext,
    headers: {
      ...originalContext.headers,
      Authorization: "Bearer " + session.accessToken,
    },
  };
});

const authAPI = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_AUTH,
});

const pokeAPI = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_MAIN,
});

const endpoint = ApolloLink.split(
  (operation) => operation.getContext().targetAPI === "auth",
  authAPI,
  pokeAPI
);

const apolloLink = from([authLink, endpoint]);
export default apolloLink;
