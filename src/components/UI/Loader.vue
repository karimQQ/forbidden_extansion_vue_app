<script>
export default {
  name: "Loader"
}
</script>

<template>
<div class="loader">

</div>
</template>

<style scoped>
.loader {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px dashed teal;
  animation: rotate 3s infinite linear;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>