module.exports = {
  client: {
    includes: ["./src/graphql/**/*.ts"],
    service: {
      skipSSLValidation: true,
      name: "PokeAPI",
      url: "https://frontend-engineer-onboarding-api-thxaa.ondigitalocean.app/graphql",
    },
  },
};
