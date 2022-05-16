<template>
  <div>
    <md-button
      v-if="started === false"
      class="md-raised md-primary"
      v-on:click="startGame"
    >
      Start
    </md-button>

    <div id="micro-service-wrapper"></div>
  </div>
</template>

<script>
import "@/load-app-script.js";
export default {
  name: "AppPage",
  data() {
    return {
      started: false,
    };
  },
  components: {},
  methods: {
    startGame() {
      this.started = true
      window.microServices.loadService("overworld/");
      console.log("Started microservice")
    },
  },
  mounted: function () {
  // wait till page is rendered and then start game
  // needed because microService.loadService needs 'micro-service-wrapper' div
  this.$nextTick(function () {
    this.startGame()
  })
}
};
</script>
