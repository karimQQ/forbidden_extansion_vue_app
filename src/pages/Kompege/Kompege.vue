<script>
import TabsService from "@/services/TabsService";
import ReplaceAnswersCheckbox from "@/pages/GoogleForms/components/ReplaceAnswersCheckbox.vue";
import Loader from "@/components/UI/Loader.vue";
import GoogleFormsAnswers from "@/pages/GoogleForms/components/GoogleFormsAnswers.vue";
import MyButton from "@/components/UI/MyButton.vue";
import SolveButton from "@/components/UI/SolveButton.vue";
import KompegeAnswers from "@/pages/Kompege/components/KompegeAnswers.vue";
import KompegeService from "@/services/KompegeService";

export default {
  name: "Kompege",
  components: {KompegeAnswers, SolveButton, MyButton, GoogleFormsAnswers, Loader, ReplaceAnswersCheckbox},
  data() {
    return {
      answers: {},
      current_task: "",
      is_answers_loading: true,
      is_task_loading: true,
      is_error: false,
      error_message: "",
      replaceAnswers: localStorage.getItem("replaceAnswersKompege") === "true"
    }
  },
  methods: {
    updateAnswers() {
      this.is_answers_loading = true
      TabsService.getActiveTabUrl(async (url) => {
        try {
          const variant = KompegeService.getVariantByUrl(url)
          this.answers = await KompegeService.getAnswers(variant)
          this.is_answers_loading = false
        } catch (e) {
          this.is_error = true
          this.error_message = e.message
          this.is_answers_loading = false
          this.is_task_loading = false
        }
      })
    },
    updateTask() {
      this.is_task_loading = true
      KompegeService.getTask((task) => {
        this.current_task = task
        this.is_task_loading = false
      }, (error) => {
        console.log(error)
        this.is_error = true
        this.error_message = error
        this.is_answers_loading = false
        this.is_task_loading = false
      })
    },
    update() {
      this.is_error = false
      this.error_message = ""
      this.updateAnswers()
      this.updateTask()
    },
    inputAnswers() {
      if (this.current_task !== "i") {
        KompegeService.inputAnswers(JSON.parse(JSON.stringify(this.answers["tasks"][this.current_task - 1]["key"])), this.replaceAnswers)
      }
    },
    changeReplaceAnswers(checked) {
      this.replaceAnswers = checked
      localStorage.setItem("replaceAnswersKompege", checked)
    }
  },
  mounted() {
    this.updateAnswers()
    this.updateTask()
  }
}
</script>

<template>
  <div class="kompege">
    <MyButton class="update-button" @click="update">Обновить</MyButton>
    <Loader v-if="is_answers_loading || is_task_loading"/>
    <div v-else-if="is_error" class="error-message">
      <p>{{ error_message }}</p>
    </div>
    <div v-else style="width: 100%">
      <KompegeAnswers :answers="answers['tasks']" :task="current_task"/>
      <SolveButton v-if="current_task !== 'i'" @click="inputAnswers">Ввести ответ</SolveButton>
      <ReplaceAnswersCheckbox v-if="current_task !== 'i'" :checked="replaceAnswers"
                              @changeReplaceAnswers="changeReplaceAnswers"/>
    </div>
  </div>
</template>

<style scoped>
.kompege {
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