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
  },
  methods: {
    parseText(text) {
      const elem = document.createElement('div')
      elem.innerHTML = text
      const res = []
      elem.querySelectorAll('p').forEach((e) => {
        res.push(e.textContent)
      })
      elem.querySelectorAll('pre').forEach((e) => {
        res.push(e.textContent)
      })
      if (res.length === 0) {
        res.push(elem.textContent)
      }
      return res
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
  <div v-if="answer['answer']['text'] !== undefined" class="answer">
    <MyTextArea v-for="p in parseText(answer['answer']['text'])" :text="p"/>
  </div>
</template>

<style scoped>
.answer {
  width: 100%;
}
</style>