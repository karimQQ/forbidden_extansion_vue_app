<script>
import MyTextArea from "@/components/UI/MyTextArea.vue";

export default {
  name: "StepikAnswer",
  components: {MyTextArea},
  props: {
    answer: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div v-if="answer['answer']['number'] !== undefined" class="answer">
    <MyTextArea :text="answer['answer']['number']"/>
  </div>
  <div v-if="answer['answer']['blanks'] !== undefined" class="answer">
    <MyTextArea v-for="blank in answer['answer']['blanks']" :text="blank"/>
  </div>
</template>

<style scoped>
.answer {
  width: 100%;
}
</style>