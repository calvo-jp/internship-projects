import { InMemoryCache } from "@apollo/client";
import { isAuthenticated } from "./vars";

const apolloCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isAuthenticated: {
          read() {
            return isAuthenticated();
          },
        },
      },
    },
  },
});

export default apolloCache;
