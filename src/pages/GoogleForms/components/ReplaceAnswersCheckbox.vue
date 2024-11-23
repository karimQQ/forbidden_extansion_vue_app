<script>
export default {
  name: "ReplaceAnswersCheckbox",
  props: {
    checked: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    check(e) {
      this.$emit('changeReplaceAnswers', e.target.checked)
    }
  }
}
</script>

<template>
  <div class="div">
    <input type="checkbox" :checked="checked" @change="check"/>
    Заменять уже имеющиеся ответы
  </div>
</template>

<style scoped>
.div {
  padding-left: 15px;
  padding-bottom: 5px;
  font-size: 15px;
}
</style>