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
      const p = elem.querySelectorAll('p')
      console.log(p)
      const res = []
      p.forEach((e) => {
        res.push(e.textContent)
      })
      console.log(res)
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