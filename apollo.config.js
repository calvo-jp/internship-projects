module.exports = {
  client: {
    includes: ["./src/graphql"],
    service: {
      name: "pokeapi",
      url: "https://beta.pokeapi.co/graphql/v1beta",
      skipSSLValidation: true,
    },
  },
};
