<template>
  <view class="hr-detail">
    <dateBar @changeDate="onDataChange" />
    <hrDayChart v-if="activeType === 'day'" />
    <hrWeekChart v-else-if="activeType === 'week'"/>
    <hrMonthChart v-else />
    <infoCard :infoData="hrCardData" :isUnit="true" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import dateBar from "./component/date-bar.vue";
import hrDayChart from "./component/hr-day-chart.vue";
import hrWeekChart from "./component/hr-week-chart.vue";
import hrMonthChart from "./component/hr-month-chart.vue";
import infoCard from "./component/info-card.vue";

const hrCardData = [
  {
    title: "心率范围",
    value: "60-103",
  },
  {
    title: "平均静息心率",
    value: "68",
  },
  {
    title: "心率过高",
    value: "--",
  },
  {
    title: "心率过低",
    value: "--",
  },
];
const activeType = ref("day"),
  currentDate = ref();
const onDataChange = (type: string) => {
  activeType.value = type;
};
</script>

<style scoped lang="less">
.hr-detail {
  padding: 16px 18px;
}
</style>
