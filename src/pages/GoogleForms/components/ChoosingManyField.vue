<script>
export default {
  name: "ChoosingManyField",
  props: {
    answers: {
      type: Array,
      required: true
    },
    chose: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="field">
    <div v-for="answer in answers" :key="answer" class="answer">
      <div v-if="chose.indexOf(answer) !== -1" class="active">

      </div>
      <div v-else class="inactive">

      </div>
      {{ answer }}
    </div>
  </div>
</template>

<style scoped>
.field {
  margin: 5px;
  padding: 5px 10px;
  border: 1px solid teal;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.answer {
  padding: 5px;
  font-size: 16px;
  color: darkslategray;
  display: flex;
  align-items: center;
}

.active {
  width: 15px;
  height: 15px;
  border: 1px solid teal;
  border-radius: 1px;
  background-color: teal;
  margin-right: 10px;
}

.inactive {
  width: 15px;
  height: 15px;
  border: 1px solid teal;
  border-radius: 1px;
  margin-right: 10px;
}
</style>