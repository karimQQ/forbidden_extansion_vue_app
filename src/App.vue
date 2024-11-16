<template>
  <div>
    <div>
      <button v-on:click="addLike">Like</button>
      <button v-on:click="addDislike">Dislike</button>
      <button v-on:click="test">Test</button>
    </div>
    <div>likes <strong>{{ likes }}</strong></div>
    <div>dislikes <strong>{{ dislikes }}</strong></div>
    <div>message <strong>{{ message }}</strong></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      likes: 0,
      dislikes: 0,
      message: "none"
    }
  },
  methods: {
    addLike() {
      this.likes++;
    },
    addDislike() {
      this.dislikes++;
    },
    test() {
      chrome.tabs.query({active: true}, (tabs) => {
        let tab = tabs[0];
        if (tab) {
          console.log(tab.url)
          this.message = tab.url
        } else {
          this.message = "error"
        }
      })
    }
  }
}
</script>

<style scoped>

</style>