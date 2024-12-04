<script>
import VersionService from "@/services/VersionService";

export default {
  name: "NewVersionMessage",
  data() {
    return {
      isVersionActual: true,
      extensionUrl: ""
    }
  },
  methods: {
    async checkVersion() {
      try {
        this.isVersionActual = await VersionService.isVersionActual()
      } catch (e) {
        console.log(e)
      }
    },
    async getUrl() {
      try {
        this.extensionUrl = await VersionService.getUrl()
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {
    this.checkVersion()
    this.getUrl()
  }
}
</script>

<template>
  <div v-if="!isVersionActual" class="new-version">
    У расширения появилась новая версия, обновиться можно <a target="_blank" :href="extensionUrl">здесь</a>
  </div>
</template>

<style scoped>
.new-version {
  margin: 15px;
}
</style>