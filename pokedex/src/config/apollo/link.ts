import { from, HttpLink } from "@apollo/client";
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

const link = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_AUTH,
});

const apolloLink = from([authLink, link]);
export default apolloLink;
