<script>
import AnswerChoosingPanelItem from "@/pages/Stepik/components/AnswerChoosingPanelItem.vue";

export default {
  name: "AnswerChoosingPanel",
  methods: {
    getArray(s, f) {
      const res = []
      for (let i = s; i < f; i++) {
        res.push(i)
      }
      return res
    },
    chooseAnswer(value) {
      this.$emit('choose', value)
    }
  },
  components: {AnswerChoosingPanelItem},
  props: {
    current: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  }
}
</script>

<template>
  <div v-if="count<=5" class="panel">
    <div v-for="i in getArray(0, count)" :key="i">
      <AnswerChoosingPanelItem v-if="i === current" :value="i" :active="true">{{ i + 1 }}</AnswerChoosingPanelItem>
      <AnswerChoosingPanelItem v-else :value="i" @choose="(value) => $emit('choose', value)">{{
          i + 1
        }}
      </AnswerChoosingPanelItem>
    </div>
  </div>
  <div v-else class="panel">
    <AnswerChoosingPanelItem v-if="current===0" :value="0"><</AnswerChoosingPanelItem>
    <AnswerChoosingPanelItem v-else :value="current-1" @choose="chooseAnswer"><</AnswerChoosingPanelItem>
    <div v-for="i in getArray(Math.min(count-5, Math.max(0, current-2)), Math.min(count-5, Math.max(0, current-2))+5)"
         :key="i">
      <AnswerChoosingPanelItem v-if="i === current" :value="i" :active="true">{{ i + 1 }}</AnswerChoosingPanelItem>
      <AnswerChoosingPanelItem v-else :value="i" @choose="chooseAnswer" :underline="true">{{
          i + 1
        }}
      </AnswerChoosingPanelItem>
    </div>
    <AnswerChoosingPanelItem v-if="current===count-1" :value="count-1">></AnswerChoosingPanelItem>
    <AnswerChoosingPanelItem v-else :value="current+1" @choose="chooseAnswer">></AnswerChoosingPanelItem>
  </div>
</template>

<style scoped>
.panel {
  display: flex;
  width: fit-content;
}
</style>