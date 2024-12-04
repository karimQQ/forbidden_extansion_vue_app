<script>
import GoogleFormsAnswer from "@/pages/GoogleForms/components/GoogleFormsAnswer.vue";

export default {
  name: "GoogleFormsAnswers",
  components: {GoogleFormsAnswer},
  props: {
    answers: {
      type: Array,
      required: true
    },
    form: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="google-forms-answers">
    <div v-if="answers.length === 0">
      <h1>Нет ответов</h1>
    </div>
    <GoogleFormsAnswer v-else v-for="field in form" :answer="answers.reduce((value, e)=>{
      if (e.field_id === field.field_id){
        return e
      } else {
        return value
      }
    }, undefined)" :field-data="field"/>
  </div>
</template>

<style scoped>
.google-forms-answers {
  width: 100%;
  border: 1px solid teal;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>