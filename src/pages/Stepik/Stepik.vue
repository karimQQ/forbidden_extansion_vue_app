<script>
import StepikAnswers from "@/pages/Stepik/components/StepikAnswers.vue";
import TabsService from "@/services/TabsService";
import StepikAnswersService from "@/services/StepikAnswersService";
import MyButton from "@/components/UI/MyButton.vue";
import Loader from "@/components/UI/Loader.vue";
import SolveButton from "@/components/UI/SolveButton.vue";

export default {
  name: "Stepik",
  components: {SolveButton, Loader, MyButton, StepikAnswers},
  data() {
    return {
      is_answers_loading: true,
      is_error: false,
      error_message: "",
      answers: [],
      current_answer: 0
    }
  },
  methods: {
    updateAnswers() {
      this.is_answers_loading = true
      this.is_error = false
      this.error_message = ""
      TabsService.getActiveTabUrl(async (url) => {
        try {
          const step_id = await StepikAnswersService.getStepIdByUrl(url)
          this.answers = await StepikAnswersService.getLastAnswers(step_id)
          console.log(this.answers)
          this.is_answers_loading = false
        } catch (e) {
          this.is_error = true
          this.error_message = e.message
          this.is_answers_loading = false
        }
      })
    },
    inputAnswer() {
      StepikAnswersService.inputAnswer(JSON.parse(JSON.stringify(this.answers[this.current_answer]['answer'])))
    },
    chooseAnswer(value) {
      this.current_answer = value
    }
  },
  mounted() {
    this.updateAnswers()
  }
}
</script>

<template>
  <div class="stepik-div">
    <MyButton class="update-button" @click="updateAnswers">Обновить</MyButton>
    <Loader v-if="is_answers_loading"/>
    <div v-else-if="is_error" class="error-message">
      <p>{{ error_message }}</p>
    </div>
    <div v-else>
      <StepikAnswers :answers="answers" :current_answer="current_answer" @choose="chooseAnswer"/>
      <SolveButton @click="inputAnswer">Ввести ответ</SolveButton>
    </div>
  </div>
</template>

<style scoped>
.stepik-div {
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