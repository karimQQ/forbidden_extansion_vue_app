<script>
export default {
  name: "MyCheckbox",
  props: {
    checked: {
      type: Boolean,
      required: true
    },
    text: {
      type: String
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
    {{text}}
  </div>
</template>

<style scoped>
.div {
  padding-left: 5px;
  padding-bottom: 5px;
  font-size: 15px;
}
</style>