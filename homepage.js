const homepage = Vue.component("homepage", {
  template: `#homepage`,
  data: function () {
    return {};
  },
  beforeRouteLeave(to, from, next) {
    console.log(to, from);
    if (to.name == "FillOutForm") {
      next(false);
    } else {
      next();
    }
  },
  methods: {
    goto() {
      this.$router.push({
        name: "pickdate",
        // query: obj
      });
    },
  },
});
