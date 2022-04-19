import { ME } from "~/graphql/queries/user";

export const state = () => ({
  loggedIn: false,
  user: {},
  token: null,
});

export const getters = {
  getUser: (state) => state.user,
  getToken: (state) => state.token,
  isLoggedIn: ({ user, token }) => (token && user ? true : false),
};

export const mutations = {
  setUser: (state, payload) => {
    state.user = payload;
  },
  setToken: (state, { token }) => {
    state.token = token;
  },
};

export const actions = {
  async fetch({ commit }) {
    try {
      const {
        data: { me },
      } = await this.app.$api.query({
        query: ME,
      });

      if (me) {
        commit("setUser", me);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
