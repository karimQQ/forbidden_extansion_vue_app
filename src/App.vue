<script>
import Header from "@/components/Header.vue";
import Stepik from "@/pages/Stepik/Stepik.vue";
import LearningApps from "@/pages/LearningApps/LearningApps.vue";
import GoogleForms from "@/pages/GoogleForms/GoogleForms.vue";
import TabsService from "@/services/TabsService";
import NewVersionMessage from "@/components/NewVersionMessage.vue";
import Kompege from "@/pages/Kompege/Kompege.vue";
import YandexEducation from "@/pages/YandexEducation/YandexEducation.vue";
import YandexEducationService from "@/services/YandexEducationService";

export default {
  components: {YandexEducation, Kompege, NewVersionMessage, GoogleForms, LearningApps, Stepik, Header},
  data() {
    return {
      site: "none"
    }
  },
  methods: {
    initializeSite() {
      TabsService.getActiveTabUrl((url) => {
        console.log(url)
        if (/https:\/\/stepik.org\/*/.test(url)) {
          this.site = "stepik"
        } else if (/https:\/\/learningapps.org\/*/.test(url)) {
          this.site = "learning_apps"
        } else if (/https:\/\/docs.google.com\/forms\/*/.test(url)) {
          this.site = "google_forms"
        } else if (/https:\/\/kompege.ru\/*/.test(url)) {
          this.site = "kompege"
        } else if (YandexEducationService.testUrl(url)) {
          this.site = "yandex_education"
        }
      })
    }
  },
  mounted() {
    this.initializeSite()
  }
}
</script>

<template>
  <div class="app">
    <Stepik v-if="site === 'stepik'"/>
    <LearningApps v-else-if="site === 'learning_apps'"/>
    <GoogleForms v-else-if="site === 'google_forms'"/>
    <Kompege v-else-if="site === 'kompege'"/>
    <YandexEducation v-else-if="site === 'yandex_education'"/>
  </div>
</template>

<style>
body {
  width: 350px;
  margin: 0;
}
</style>