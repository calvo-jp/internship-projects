import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: "https://beta.pokeapi.co/graphql/v1beta",
});

export default client;
