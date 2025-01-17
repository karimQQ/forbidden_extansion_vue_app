<script>
import MyTextArea from "@/components/UI/MyTextArea.vue";

export default {
  name: "KompegeAnswer",
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
      <MyTextArea v-for="key in task['key'].split('\\n')" :text="key"/>
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