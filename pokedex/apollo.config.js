const endpoints = {
  main: "https://beta.pokeapi.co/graphql/v1beta",
  auth: "https://frontend-engineer-onboarding-api-thxaa.ondigitalocean.app/graphql",
};

module.exports = {
  client: {
    service: {
      name: "GraphQL API",
      url: endpoints.main,
      skipSSLValidation: true,
    },
  },
};
