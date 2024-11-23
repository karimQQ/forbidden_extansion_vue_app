<script>
import MyButton from "@/components/UI/MyButton.vue";
import CopyButton from "@/components/UI/CopyButton.vue";

export default {
  name: "MyTextArea",
  components: {CopyButton, MyButton},
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="textarea">
    <div class="text">
      {{ text }}
    </div>
    <CopyButton :value="text"/>
  </div>
</template>

<style scoped>
.textarea {
  margin: 5px;
  padding: 5px 15px;
  border: 1px solid teal;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 16px;
  color: darkslategray;
}
</style>