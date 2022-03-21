module.exports = {
  client: {
    service: {
      skipSSLValidation: true,
      name: "PokeAPI",
      url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_MAIN,
    },
  },
};
