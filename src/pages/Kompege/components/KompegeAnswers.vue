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
      type: Number
    }
  }
}
</script>

<template>
  <div v-if="task===-1">
    <KompegeAnswer v-for="answer in answers" :task="answer"/>
  </div>
  <KompegeAnswer v-else :task="answers[task]"/>
</template>

<style scoped>

</style>