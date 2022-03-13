module.exports = {
  client: {
    includes: ["./src/graphql/**/*.ts"],
    service: {
      name: "graphql-api",
      url: "http://countries.trevorblades.com/",
    },
  },
};
