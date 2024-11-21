<script>
import MyButton from "@/components/UI/MyButton.vue";
import LearningAppsService from "@/services/LearningAppsService";

export default {
  name: "LearningApps",
  components: {MyButton},
  methods: {
    solveLearningApps() {
      LearningAppsService.solve()
    }
  }
}
</script>

<template>
  <div class="learning-apps">
    <MyButton class="solve-learning-apps-button" @click="solveLearningApps">Решить</MyButton>
  </div>
</template>

<style scoped>
.learning-apps {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.solve-learning-apps-button {
  background-color: mediumspringgreen;
  width: 290px;
  margin: 5px;
}
</style>