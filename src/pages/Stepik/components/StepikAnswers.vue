<script>
import StepikAnswer from "@/pages/Stepik/components/StepikAnswer.vue";
import Loader from "@/components/UI/Loader.vue";
import AnswerChoosingPanel from "@/pages/Stepik/components/AnswerChoosingPanel.vue";

export default {
  name: "StepikAnswers",
  components: {AnswerChoosingPanel, Loader, StepikAnswer},
  props: {
    answers: {
      type: Array,
      required: true
    },
    current_answer: {
      type: Number,
      required: true
    }
  }
}
</script>

<template>
  <div class="stepik-answers">
    <div v-if="answers.length === 0">
      <h1>Нет ответов</h1>
    </div>
    <StepikAnswer v-if="answers.length > 0" :answer="answers[current_answer]"/>
    <AnswerChoosingPanel v-if="answers.length > 1" :count="answers.length" :current="current_answer"
                         @choose="(value)=>$emit('choose', value)"/>
  </div>
</template>

<style scoped>
.stepik-answers {
  width: 100%;
  border: 1px solid teal;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>