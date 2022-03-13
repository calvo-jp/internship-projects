import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useSession } from "next-auth/react";

const authMiddleware = new ApolloLink((operation, forward) => {
  const session = useSession();

  if (!!session.data) {
    operation.setContext({
      headers: {
        authorization: "Bearer " + session.data.accessToken,
      },
    });
  }

  return forward(operation);
});

const link = new HttpLink({ uri: process.env.GRAPHQL_ENDPOINT });
const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: authMiddleware.concat(link),
  cache,
});

export default apolloClient;
