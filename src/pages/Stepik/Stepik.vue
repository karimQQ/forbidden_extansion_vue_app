<script>
import StepikAnswers from "@/pages/Stepik/components/StepikAnswers.vue";
import TabsService from "@/services/TabsService";
import StepikAnswersService from "@/services/StepikAnswersService";
import MyButton from "@/components/UI/MyButton.vue";
import Loader from "@/components/UI/Loader.vue";

export default {
  name: "Stepik",
  components: {Loader, MyButton, StepikAnswers},
  data() {
    this.updateAnswers()
    return {
      is_answers_loading: true,
      answers: [],
      current_answer: 0
    }
  },
  methods: {
    updateAnswers() {
      this.is_answers_loading = true
      TabsService.getActiveTabUrl(async (url) => {
        const step_id = await StepikAnswersService.getStepIdByUrl(url)
        this.answers = await StepikAnswersService.getLastAnswers(step_id)
        console.log(this.answers)
        this.is_answers_loading = false
      })
    },
    inputAnswer() {
      StepikAnswersService.inputAnswer(JSON.parse(JSON.stringify(this.answers[this.current_answer]['answer'])))
    },
    chooseAnswer(value) {
      this.current_answer = value
    }
  }
}
</script>

<template>
  <div class="stepik-div">
    <MyButton class="update-button" @click="updateAnswers">Обновить</MyButton>
    <Loader v-if="is_answers_loading"/>
    <div v-else>
      <StepikAnswers :answers="answers" :current_answer="current_answer" @choose="chooseAnswer"/>
      <MyButton class="input-button" @click="inputAnswer">Ввести ответ</MyButton>
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

.input-button {
  background-color: mediumspringgreen;
  width: 290px;
  margin: 5px;
}
</style>