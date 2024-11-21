<script>
import MyButton from "@/components/UI/MyButton.vue";

export default {
  name: "CopyButton",
  components: {MyButton},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      is_animation_running: false
    }
  },
  methods: {
    copyValue() {
      navigator.clipboard.writeText(this.value).then(() => {
        this.is_animation_running = true
        setTimeout(() => this.is_animation_running = false, 600)
      }, function (err) {
        console.error('Произошла ошибка при копировании текста: ', err);
      });
    }
  }
}
</script>

<template>
  <MyButton v-if="!is_animation_running" @click="copyValue" class="copy-button">Copy</MyButton>
  <MyButton v-else class="copy-button">✔</MyButton>
</template>

<style scoped>
.copy-button {
  width: 50px;
  height: 32px;
}
</style>