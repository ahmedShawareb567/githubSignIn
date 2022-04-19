import Vue from "vue";

export default ({ app }) => {
  const client = app.apolloProvider.defaultClient;

  Vue.prototype.$api = client;
  app.$api = client;
  Vue.$api = client;
};
