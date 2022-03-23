import { ApolloClient, InMemoryCache } from "@apollo/client";
import apolloLink from "./link";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: apolloLink,
});

export default apolloClient;
