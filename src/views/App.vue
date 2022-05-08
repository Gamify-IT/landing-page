<template>
    <div>
        <md-button v-if="started === false"
            class="md-raised md-primary"
            v-on:click="startGame"
        >
            Start
        </md-button>
        <UnityScene ref="unityScene"></UnityScene>
    </div>

</template>

<script>
import UnityScene from "../UnityScene.vue";
export default {
  name: "AppPage",
  data() {
    return {
      started: false,
    };
  },
  components: { UnityScene },
  methods: {
    startGame() {
      this.$refs.unityScene.startGame();
      this.started = true
    },
  },
  created: function () {
    //this.startGame()
  }
};
</script>
