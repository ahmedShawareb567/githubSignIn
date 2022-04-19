import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { logErrorMessages } from "@vue/apollo-util";

export default function ({ store, $config, app, i18n }) {
  const url = $config.GRAPHQL_BASE;

  const link = onError((error) => {
    if (process.env.NODE_ENV !== "production") {
      logErrorMessages(error);
    }
  });

  let headers = {};

  // const cookieRes = app.$cookies.get("token");
  // if (cookieRes) {
  //   headers.Authorization = cookieRes;
  // }

  return {
    link,
    httpEndpoint: url,
    getAuth: () => {
      const token = store.getters["auth/getToken"];
      if (token) {
        return `Bearer ${token}`;
      }
      return ``;
    },
    cache: new InMemoryCache(),
    httpLinkOptions: {
      headers,
    },
    apollo: {
      defaultOptions: {
        watchQuery: {
          fetchPolicy: "no-cache",
        },
        query: {
          fetchPolicy: "no-cache",
        },
        mutate: {
          fetchPolicy: "no-cache",
        },
      },
    },
  };
}
