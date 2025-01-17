<script>
import MyButton from "@/components/UI/MyButton.vue";

export default {
  name: "SolveButton",
  components: {MyButton}
}
</script>

<template>
  <div class="solve-button-div">
    <MyButton class="solve-button" @click="inputAnswer">
      <slot></slot>
    </MyButton>
  </div>
</template>

<style scoped>
.solve-button-div {
  margin: 5px;
}

.solve-button {
  background-color: mediumspringgreen;
  width: 100%;
}
</style>