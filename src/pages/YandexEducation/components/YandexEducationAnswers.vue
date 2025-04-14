<script>
import YandexEducationAnswer from "@/pages/YandexEducation/components/YandexEducationAnswer.vue";

export default {
  name: "YandexEducationAnswers",
  components: {YandexEducationAnswer},
  props: {
    answers: {
      type: Array,
      required: true
    },
    task: {
      type: Number
    }
  }
}
</script>

<template>
  <div v-if="task===-1">
    <YandexEducationAnswer v-for="answer in answers" :task="answer"/>
  </div>
  <YandexEducationAnswer v-else :task="answers[task]"/>
</template>

<style scoped>

</style>