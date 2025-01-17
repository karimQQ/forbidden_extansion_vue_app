<script>
import KompegeAnswer from "@/pages/Kompege/components/KompegeAnswer.vue";

export default {
  name: "KompegeAnswers",
  components: {KompegeAnswer},
  props: {
    answers: {
      type: Array,
      required: true
    },
    task: {
      type: String
    }
  }
}
</script>

<template>
  <div v-if="task==='i'">
    <KompegeAnswer v-for="answer in answers" :task="answer"/>
  </div>
  <KompegeAnswer v-else :task="answers[task - 1]"/>
</template>

<style scoped>

</style>