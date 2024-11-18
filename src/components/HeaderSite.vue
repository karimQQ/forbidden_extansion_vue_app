<script>
export default {
  name: "HeaderSite",
  props: {
    value: {
      type: String,
      required: true
    },
    current_site: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div v-if="current_site===value" @click="$emit('choose', value)" class="header-site active-header-site">
    <slot></slot>
  </div>
  <div v-else class="header-site inactive-header-site" @click="$emit('choose', value)">
    <slot></slot>
  </div>
</template>

<style scoped>
.header-site {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  cursor: pointer;
}

.active-header-site {
  background-color: darkgray;
}

.inactive-header-site:hover {
  background-color: lightgray;
}
</style>