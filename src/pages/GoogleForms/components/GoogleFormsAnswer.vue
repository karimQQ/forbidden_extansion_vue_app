<script>
import MyTextArea from "@/components/UI/MyTextArea.vue";

export default {
  name: "GoogleFormsAnswer",
  components: {MyTextArea},
  props: {
    fieldData: {
      type: Object,
      required: true
    },
    answer: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div v-if="answer !== undefined" class="answer">
    <MyTextArea v-if="fieldData['type']===0" :text="answer['answer']['text']"/>
  </div>
</template>

<style scoped>
.answer {
  width: 100%;
}
</style>