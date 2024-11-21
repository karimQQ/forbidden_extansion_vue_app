<script>
export default {
  name: "MyButton"
}
</script>

<template>
<button class="button">
  <slot></slot>
</button>
</template>

<style scoped>
.button {
  padding: 5px;
  color: darkslategray;
  font-size: 14px;
  background: transparent;
  border: 1px solid teal;
  border-radius: 5px;
  cursor: pointer;
}
</style>