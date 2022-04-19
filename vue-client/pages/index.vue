<template lang="pug">
.home
  .container
    .row
      .col-12
        .text-center
          .github
            .github-icon.pb-4: svgIcon(name="github")
          a.github-button.btn.mx-auto(href="/auth/github"): span Sign in #[svgIcon.ml-2(name="arrow-right")]
</template>

<script>
export default {
  name: "IndexPage",
  middleware: ["notAuth"],
};
</script>
<style lang="scss">
.home {
  position: fixed;
  top: 0rem;
  left: 0rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .github {
    &-icon {
      .icon {
        width: 5rem !important;
        height: 5rem !important;
      }
    }
    &-button {
      width: 10rem;
      height: 3rem;
      border-radius: 4rem;
      border: 0.15rem solid #000;
      background-color: #000;
      color: #fff;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.1s ease-in-out;
      .icon {
        fill: #fff;
      }
      &:hover {
        background-color: transparent;
        color: #000;
        .icon {
          fill: #000;
        }
      }
    }
  }
}
</style>
