import { ApolloClient } from "@apollo/client";
import apolloCache from "./cache";
import apolloLink from "./link";

const apolloClient = new ApolloClient({
  link: apolloLink,
  cache: apolloCache,
});

export default apolloClient;
