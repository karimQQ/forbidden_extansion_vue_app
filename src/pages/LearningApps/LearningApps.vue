<script>
import MyButton from "@/components/UI/MyButton.vue";
import LearningAppsService from "@/services/LearningAppsService";
import SolveButton from "@/components/UI/SolveButton.vue";

export default {
  name: "LearningApps",
  components: {SolveButton, MyButton},
  methods: {
    solveLearningApps() {
      LearningAppsService.solve()
    }
  }
}
</script>

<template>
  <div class="learning-apps">
    <SolveButton @click="solveLearningApps">Решить</SolveButton>
  </div>
</template>

<style scoped>
.learning-apps {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>