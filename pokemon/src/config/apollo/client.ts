import { ApolloClient, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pokemon_v2_pokemon: offsetLimitPagination(),
      },
    },
  },
});

const apolloClient = new ApolloClient({
  cache,
  uri: "https://beta.pokeapi.co/graphql/v1beta",
});

export default apolloClient;
