<script>
import MyTextArea from "@/components/UI/MyTextArea.vue";
import ChoosingOneField from "@/pages/GoogleForms/components/ChoosingOneField.vue";
import ChoosingManyField from "@/pages/GoogleForms/components/ChoosingManyField.vue";

export default {
  name: "GoogleFormsAnswer",
  components: {ChoosingManyField, ChoosingOneField, MyTextArea},
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
    <MyTextArea v-if="fieldData['type'] === 0" :text="answer['answer']['text']"/>
    <ChoosingOneField v-if="fieldData['type'] === 2" :chose="answer['answer']['one_list']"
                      :answers="fieldData['data']"/>
    <MyTextArea v-if="fieldData['type'] === 3" :text="answer['answer']['dropdown_list']"/>
    <ChoosingManyField v-if="fieldData['type'] === 4" :chose="answer['answer']['many_list']"
                       :answers="fieldData['data']"/>
  </div>
</template>

<style scoped>
.answer {
  width: 100%;
}
</style>