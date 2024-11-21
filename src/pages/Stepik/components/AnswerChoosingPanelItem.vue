<script>
export default {
  name: "AnswerChoosingPanelItem",
  props: {
    value: {
      type: Number,
      required: true
    },
    active: {
      type: Boolean,
      required: false
    },
    underline: {
      type: Boolean,
      required: false
    }
  }
}
</script>

<template>
  <div v-if="active" class="item active">
    <strong>
      <slot></slot>
    </strong>
  </div>
  <div v-else-if="underline" class="item inactive underline" @click="$emit('choose',value)">
    <slot></slot>
  </div>
  <div v-else class="item inactive" @click="$emit('choose',value)">
    <slot></slot>
  </div>
</template>

<style scoped>
.item {
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
}

.underline:hover {
  text-decoration: underline;
}

.active {
  text-decoration: underline;
}

.inactive {
  color: darkslategray;
}
</style>