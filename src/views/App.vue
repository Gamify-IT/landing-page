<template>
  <div>
    <md-button
      v-if="started === false"
      class="md-raised md-primary"
      v-on:click="startGame"
    >
      Start
    </md-button>
  </div>
</template>

<script>
export default {
  name: "AppPage",
  data() {
    return {
      started: false,
    };
  },
  components: {},
  methods: {
    startGame() {},
  },
  created: function () {
    //this.startGame()
  },
};
</script>
