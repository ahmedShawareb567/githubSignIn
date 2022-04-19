export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async nuxtServerInit({ commit, getters, dispatch }, { redirect }) {
    try {
      const token = this.app.$cookies.get("token");
      commit("auth/setToken", { token });
      if (token) {
        await dispatch("auth/fetch");
      }
    } catch (e) {
      console.log(e);
    }
  },
};
