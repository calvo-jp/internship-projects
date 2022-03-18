const endpoint = "https://beta.pokeapi.co/graphql/v1beta";

module.exports = {
  client: {
    excludes: ["./src/types"],
    service: {
      name: "GraphQL Server",
      url: endpoint,
    },
  },
};
