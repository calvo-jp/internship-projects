// HEADS UP!
//
// Apollo vscode extension can only handle one endpoint.
// Queries, mutations and subs will error out
// depending on what endpoint is currently not used.

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
