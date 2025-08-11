<script setup></script>

<template>
  <div id="loader" class="z-50 center">
    <img
      id="image-container"
      style="width: 180px"
      src="../../assets/images/loading.png"
      alt="loading"
    />
    <h5 style="text-align: center; margin-bottom: 20px">
      Sedang memuat halaman AyoPramuka Kwarnas, <br />
      mohon ditunggu ya.
    </h5>
    <span class="dotLoader"></span>
  </div>
</template>

<style>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  gap: 5px;
}

/* HTML: <div class="loader"></div> */
.dotLoader {
  height: 30px;
  aspect-ratio: 2.5;
  --_g: no-repeat radial-gradient(farthest-side, #9e3cb9 90%, #0000);
  background: var(--_g), var(--_g), var(--_g), var(--_g);
  background-size: 20% 50%;
  animation: l43 1s infinite linear;
}
@keyframes l43 {
  0% {
    background-position: calc(0 * 100% / 3) 50%, calc(1 * 100% / 3) 50%,
      calc(2 * 100% / 3) 50%, calc(3 * 100% / 3) 50%;
  }
  16.67% {
    background-position: calc(0 * 100% / 3) 0, calc(1 * 100% / 3) 50%,
      calc(2 * 100% / 3) 50%, calc(3 * 100% / 3) 50%;
  }
  33.33% {
    background-position: calc(0 * 100% / 3) 100%, calc(1 * 100% / 3) 0,
      calc(2 * 100% / 3) 50%, calc(3 * 100% / 3) 50%;
  }
  50% {
    background-position: calc(0 * 100% / 3) 50%, calc(1 * 100% / 3) 100%,
      calc(2 * 100% / 3) 0, calc(3 * 100% / 3) 50%;
  }
  66.67% {
    background-position: calc(0 * 100% / 3) 50%, calc(1 * 100% / 3) 50%,
      calc(2 * 100% / 3) 100%, calc(3 * 100% / 3) 0;
  }
  83.33% {
    background-position: calc(0 * 100% / 3) 50%, calc(1 * 100% / 3) 50%,
      calc(2 * 100% / 3) 50%, calc(3 * 100% / 3) 100%;
  }
  100% {
    background-position: calc(0 * 100% / 3) 50%, calc(1 * 100% / 3) 50%,
      calc(2 * 100% / 3) 50%, calc(3 * 100% / 3) 50%;
  }
}
</style>
