<template lang="pug">
.profile.py-5.my-5
  .container
    .row.justify-content-center
      .col-lg-8.col-md-10
        .profile-content(v-if="user")
          .profile-image.mx-auto
            AppImg(:src="user.profilePicture")
          .profile-details.text-center.pt-4
            h3 {{user.userName}}

          h5.mt-5.mb-3: span #[svgIcon.mr-1(name="book")] Repositories:
          div(v-if="repos && repos.length")
            a(:href="repo.html_url" target="_blank" v-for="repo in repos" :key="repo.id").profile-repo.mb-3
              h6.mb-0 {{user.userName}} / {{repo.name}}
          div(v-else)
            p Loading ...

  .profile-logOut
    button.mb-0.profile-logOut-button(@click="logOut()"): span logout #[svgIcon.ml-1(name="logout")]
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "IndexPage",
  middleware: ["auth"],
  computed: {
    ...mapGetters({
      user: "auth/getUser",
    }),
  },
  data() {
    return {
      isLoading: false,
      repos: [],
      githubProfile: null,
    };
  },
  async mounted() {
    try {
      const url = `https://api.github.com/users/${this.user.userName}/repos`;
      this.repos = await this.fetchAsync(url);
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    logOut() {
      this.$store.commit("auth/setUser", null);
      this.$store.commit("auth/setToken", { token: null });
      this.$cookies.remove("token");
      this.$router.push("/");
    },
    async fetchAsync(url) {
      let response = await fetch(url);
      let data = await response.json();
      return data;
    },
  },
};
</script>
<style lang="scss">
.profile {
  a {
    color: #000;
  }
  &-image {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.1);
    border: 0.15rem solid rgba(0, 0, 0, 0.05);
  }
  &-repo {
    display: block;
    background-color: rgba(0, 0, 0, 0.02);
    border-radius: 1rem;
    padding: 2rem;
  }
  &-logOut {
    position: fixed;
    top: 0rem;
    left: 0rem;
    padding: 1rem;
    &-button {
      padding: 0.4rem 1rem;
      border-radius: 0.5rem;
      background-color: rgba(0, 0, 0, 0.05);
      outline: none;
      border: none;
    }
  }
}
</style>
