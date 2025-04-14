<script>
import TabsService from "@/services/TabsService";
import GoogleFormsService from "@/services/GoogleFormsService";
import Loader from "@/components/UI/Loader.vue";
import GoogleFormsAnswers from "@/pages/GoogleForms/components/GoogleFormsAnswers.vue";
import MyButton from "@/components/UI/MyButton.vue";
import SolveButton from "@/components/UI/SolveButton.vue";
import MyCheckbox from "@/components/UI/MyCheckbox.vue";

export default {
  name: "GoogleForms",
  components: {MyCheckbox, SolveButton, MyButton, GoogleFormsAnswers, Loader},
  data() {
    return {
      answers: [],
      form: [],
      is_answers_loading: true,
      is_form_loading: true,
      is_error: false,
      error_message: "",
      replaceAnswers: localStorage.getItem("replaceAnswers") === "true"
    }
  },
  methods: {
    updateAnswers() {
      this.is_answers_loading = true
      TabsService.getActiveTabUrl(async (url) => {
        try {
          const form_id = GoogleFormsService.getFormIdByUrl(url)
          this.answers = await GoogleFormsService.getAnswers(form_id)
          this.is_answers_loading = false
        } catch (e) {
          this.is_error = true
          this.error_message = e.message
          this.is_answers_loading = false
          this.is_form_loading = false
        }
      })
    },
    updateForm() {
      this.is_form_loading = true
      GoogleFormsService.getForm((form) => {
        this.form = form
        this.is_form_loading = false
      }, (error) => {
        console.log(error)
        this.is_error = true
        this.error_message = error
        this.is_answers_loading = false
        this.is_form_loading = false
      })
    },
    update() {
      this.is_error = false
      this.error_message = ""
      this.updateAnswers()
      this.updateForm()
    },
    inputAnswers() {
      GoogleFormsService.inputAnswers(JSON.parse(JSON.stringify(this.answers)), this.replaceAnswers)
    },
    changeReplaceAnswers(checked) {
      this.replaceAnswers = checked
      localStorage.setItem("replaceAnswers", checked)
    }
  },
  mounted() {
    this.update()
  }
}
</script>

<template>
  <div class="google-forms">
    <MyButton class="update-button" @click="update">Обновить</MyButton>
    <Loader v-if="is_answers_loading || is_form_loading"/>
    <div v-else-if="is_error" class="error-message">
      <p>{{ error_message }}</p>
    </div>
    <div v-else style="width: 100%">
      <GoogleFormsAnswers :form="form" :answers="answers"/>
      <SolveButton @click="inputAnswers">Ввести ответ</SolveButton>
      <MyCheckbox :checked="replaceAnswers" :text="'Заменять уже имеющиеся ответы'"
                  @changeReplaceAnswers="changeReplaceAnswers"/>
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

.error-message {
  color: red;
  margin: 15px;
  padding: 5px;
  font-size: 16px;
}
</style>