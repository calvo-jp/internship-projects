const endpoint =
  "https://frontend-engineer-onboarding-api-thxaa.ondigitalocean.app/graphql";

module.exports = {
  client: {
    excludes: ["./src/types"],
    service: {
      name: "GraphQL Server",
      url: endpoint,
    },
  },
};
