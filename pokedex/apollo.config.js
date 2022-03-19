module.exports = {
  client: {
    includes: ["./src/graphql/**/*.ts"],
    service: {
      name: "PokeAPI",
      url: "https://beta.pokeapi.co/graphql/v1beta",
      skipSSLValidation: true,
    },
  },
};
