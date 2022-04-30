<template>
  <div id="game-wrapper">
    <div id="unity-container" class="unity-desktop">
      <canvas id="unity-canvas" width="960" height="600"></canvas>
      <div id="unity-loading-bar">
        <div id="unity-logo"></div>
        <div id="unity-progress-bar-empty">
          <div id="unity-progress-bar-full"></div>
        </div>
      </div>
      <div id="unity-warning"></div>
      <!-- <div id="unity-footer">
        <div id="unity-webgl-logo"></div>
        <div id="unity-fullscreen-button"></div>
        <div id="unity-build-title"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    startGame() {
      window["unityScript"]();
    }
  }
};
</script>

<style></style>
