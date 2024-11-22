<script>
import MyButton from "@/components/UI/MyButton.vue";

export default {
  name: "SolveButton",
  components: {MyButton}
}
</script>

<template>
  <MyButton class="solve-button" @click="inputAnswer">
    <slot></slot>
  </MyButton>
</template>

<style scoped>
.solve-button {
  background-color: mediumspringgreen;
  width: 290px;
  margin: 5px;
}
</style>