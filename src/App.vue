<script>
import Header from "@/components/Header.vue";
import Stepik from "@/pages/Stepik/Stepik.vue";
import LearningApps from "@/pages/LearningApps/LearningApps.vue";
import GoogleForms from "@/pages/GoogleForms/GoogleForms.vue";
import TabsService from "@/services/TabsService";

export default {
  components: {GoogleForms, LearningApps, Stepik, Header},
  data() {
    this.initializeSite()
    return {
      site: "none"
    }
  },
  methods: {
    chooseSite(value) {
      this.site = value
    },

    initializeSite() {
      TabsService.getActiveTabUrl((url) => {
        if (/https:\/\/stepik.org\/*/.test(url)) {
          this.site = "stepik"
        } else if (/https:\/\/learningapps.org\/*/.test(url)) {
          this.site = "learning_apps"
        } else if (/https:\/\/docs.google.com\/forms\/d\/e\/*/.test(url)) {
          this.site = "google_forms"
        }
      })
    }
  },
}
</script>

<template>
  <div class="app">
    <Header :current_site="site" @choose="chooseSite"/>
    <Stepik v-if="site === 'stepik'"/>
    <LearningApps v-if="site === 'learning_apps'"/>
    <GoogleForms v-if="site === 'google_forms'"/>
  </div>
</template>

<style>
body {
  width: 300px;
  margin: 0;
}
</style>