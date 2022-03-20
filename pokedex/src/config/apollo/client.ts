import { ApolloClient } from "@apollo/client";
import apolloCache from "./cache";
import apolloLink from "./link";

const apolloClient = new ApolloClient({
  cache: apolloCache,
  link: apolloLink,
});

export default apolloClient;
