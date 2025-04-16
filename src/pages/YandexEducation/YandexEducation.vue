<script>
import TabsService from "@/services/TabsService";
import YandexEducationService from "@/services/YandexEducationService";
import MyButton from "@/components/UI/MyButton.vue";
import Loader from "@/components/UI/Loader.vue";
import SolveButton from "@/components/UI/SolveButton.vue";
import YandexEducationAnswers from "@/pages/YandexEducation/components/YandexEducationAnswers.vue";
import MyCheckbox from "@/components/UI/MyCheckbox.vue";

export default {
  name: "YandexEducation",
  components: {
    MyCheckbox,
    YandexEducationAnswers,
    SolveButton,
    Loader,
    MyButton
  },
  data() {
    return {
      answers: [],
      current_task: -1,
      all_answers: false,
      is_answers_loading: true,
      is_error: false,
      error_message: "",
      replaceAnswers: localStorage.getItem("replaceAnswersYandex") === "true"
    }
  },
  methods: {
    updateAnswers() {
      this.is_error = false
      this.error_message = ""
      this.is_answers_loading = true
      TabsService.getActiveTabUrl(async (url) => {
        try {
          this.current_task = YandexEducationService.getTaskByUrl(url)
          this.answers = await YandexEducationService.getAnswers(url)
          console.log(this.answers)
          this.is_answers_loading = false
        } catch (e) {
          this.is_error = true
          this.error_message = e.message
          this.is_answers_loading = false
        }
      })
    },
    inputAnswers() {
      if (this.current_task !== -1) {
        YandexEducationService.inputAnswers(JSON.parse(JSON.stringify(this.answers[this.current_task]["answer"])), this.replaceAnswers)
      }
    },
    changeReplaceAnswers(checked) {
      this.replaceAnswers = checked
      localStorage.setItem("replaceAnswersYandex", checked)
    },
    changeAllAnswers(checked) {
      this.all_answers = checked
    }
  },
  mounted() {
    this.updateAnswers()
  }
}
</script>

<template>
  <div class="header">
    <MyCheckbox :checked="all_answers" :text="'Все ответы'" @changeReplaceAnswers="changeAllAnswers"/>
    <MyButton @click="updateAnswers">Обновить</MyButton>
  </div>
  <div class="yandex">
    <Loader v-if="is_answers_loading"/>
    <div v-else-if="is_error" class="error-message">
      <p>{{ error_message }}</p>
    </div>
    <div v-else style="width: 100%">
      <YandexEducationAnswers v-if="all_answers" :answers="answers" :task="-1"/>
      <YandexEducationAnswers v-else :answers="answers" :task="current_task"/>
      <SolveButton v-if="!all_answers" @click="inputAnswers">Ввести ответ</SolveButton>
      <MyCheckbox v-if="!all_answers" :checked="replaceAnswers" :text="'Заменять уже имеющиеся ответы'"
                  @changeReplaceAnswers="changeReplaceAnswers"/>
    </div>
  </div>
</template>

<style scoped>
.yandex {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.update-button {
  align-self: flex-end;
  margin: 5px;
}

.header {
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.error-message {
  color: red;
  margin: 15px;
  padding: 5px;
  font-size: 16px;
}
</style>