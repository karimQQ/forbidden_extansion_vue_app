<script>
import TabsService from "@/services/TabsService";
import GoogleFormsService from "@/services/GoogleFormsService";
import Loader from "@/components/UI/Loader.vue";
import GoogleFormsAnswers from "@/pages/GoogleForms/components/GoogleFormsAnswers.vue";
import MyButton from "@/components/UI/MyButton.vue";

export default {
  name: "GoogleForms",
  components: {MyButton, GoogleFormsAnswers, Loader},
  data() {
    this.updateAnswers()
    this.updateForm()
    return {
      answers: [],
      form: [],
      is_answers_loading: true,
      is_form_loading: true
    }
  },
  methods: {
    updateAnswers() {
      this.is_answers_loading = true
      TabsService.getActiveTabUrl(async (url) => {
        const form_id = GoogleFormsService.getFormIdByUrl(url)
        this.answers = await GoogleFormsService.getAnswers(form_id)
        this.is_answers_loading = false
      })
    },
    updateForm() {
      this.is_form_loading = true
      GoogleFormsService.getForm((form) => {
        this.form = form
        this.is_form_loading = false
      })
    }
  }
}
</script>

<template>
  <div class="google-forms">
    <MyButton class="update-button" @click="updateForm(); updateAnswers()">Обновить</MyButton>
    <Loader v-if="is_answers_loading || is_form_loading"/>
    <div v-else style="width: 100%">
      <GoogleFormsAnswers :form="form" :answers="answers"/>
    </div>
  </div>
</template>

<style scoped>
.google-forms {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.update-button {
  align-self: flex-end;
  margin: 5px;
}
</style>