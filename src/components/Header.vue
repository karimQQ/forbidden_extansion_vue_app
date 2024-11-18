<script>
import HeaderSite from "@/components/HeaderSite.vue";

export default {
  name: "Header",
  components: {HeaderSite},
  props: {
    current_site: {
      type: String,
      required: true
    }
  },
  methods: {
    changeSite(value) {
      console.log()
      this.$emit("choose", value)
    }
  }
}
</script>

<template>
  <div class="header">
    <HeaderSite :value="'stepik'" :current_site="current_site" @choose="changeSite">Stepik</HeaderSite>
    <HeaderSite :value="'learning_apps'" :current_site="current_site" @choose="changeSite">Learning Apps</HeaderSite>
    <HeaderSite :value="'google_forms'" :current_site="current_site" @choose="changeSite">Google Forms</HeaderSite>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  height: 50px;
}
</style>