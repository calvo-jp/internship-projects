module.exports = {
  client: {
    service: {
      name: "graphql-api",
      url: "",
    },
    excludes: ["./src/api/**/*.ts"],
    includes: ["./src/graphql/**/*.ts"],
  },
};
