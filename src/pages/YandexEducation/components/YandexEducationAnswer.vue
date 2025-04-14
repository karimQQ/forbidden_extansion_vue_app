<script>
import MyTextArea from "@/components/UI/MyTextArea.vue";

export default {
  name: "YandexEducationAnswer",
  components: {MyTextArea},
  props: {
    task: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class="answer">
    <div class="number">
      {{ task['number'] }}.
    </div>
    <div class="key">
      <MyTextArea v-if="!Array.isArray(task['answer'])" :text="task['answer']"/>
      <MyTextArea v-else-if="Array.isArray(task['answer'][0])" v-for="row in task['answer']" :text="row.join(' ')"/>
      <MyTextArea v-else :text="task['answer'].join(' ')"/>
    </div>
  </div>
</template>

<style scoped>
.answer {
  display: flex;
}

.number {
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 5px;
  font-size: 16px;
}

.key {
  width: 100%;
}
</style>