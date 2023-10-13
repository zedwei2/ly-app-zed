<template>
  <view class="spo-detail">
    <dateBar @changeDate="onDataChange" />
    <spoDayChart v-if="timeType === 'day'" />
    <spoMonthChart v-else :type="timeType" />
    <infoCard :infoData="spoCardData" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import dateBar from "./component/date-bar.vue";
import spoDayChart from "./component/spo-day-chart.vue";
import spoMonthChart from "./component/spo-month-chart.vue";
import infoCard from "./component/info-card.vue";
const spoCardData = [
  {
    title: "最新值 15:55",
    value: "90%",
  },
  {
    title: "血氧范围",
    value: "89%-100%",
  },
];

const timeType = ref("day");
const onDataChange = (type: string) => {
  timeType.value = type;
};
</script>

<style scoped lang="less">
.spo-detail {
  padding: 16px 18px;
}
</style>
