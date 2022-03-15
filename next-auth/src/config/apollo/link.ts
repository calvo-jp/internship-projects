import { from, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { getSession } from "next-auth/react";

const retry = new RetryLink({
  attempts: {
    max: 2,
    async retryIf() {
      const session = await getSession();
      return !!session && !!session.refreshToken;
    },
  },
});

const errorLink = onError(({ forward, operation, graphQLErrors }) => {});

const authLink = setContext(async (request, originalContext) => {
  const session = await getSession();

  const context = {
    ...originalContext,
    headers: {
      ...originalContext.headers,
      Authorization: session ? "Bearer " + session.accessToken : "",
    },
  };

  return context;
});

const link = new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT });

const apolloLink = from([authLink, link]);

export default apolloLink;
