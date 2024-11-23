<script>
import VersionService from "@/services/VersionService";

export default {
  name: "NewVersionMessage",
  data() {
    this.checkVersion()
    return {
      isVersionActual: true
    }
  },
  methods: {
    async checkVersion() {
      try {
        this.isVersionActual = await VersionService.isVersionActual()
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<template>
  <div v-if="!isVersionActual" class="new-version">
    У расширения появилась новая версия, обновиться можно <a target="_blank"
                                                             href="https://chromewebstore.google.com/detail/forbidden-gdz/enjlnfchjaclpbnmmmomndedlaemoeip">здесь</a>
  </div>
</template>

<style scoped>
.new-version {
  margin: 15px;
}
</style>