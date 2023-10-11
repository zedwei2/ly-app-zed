<template>
  <view class="hr-detail">
    <dateBar />
    <weeekAreaChart />
    <infoCard :infoData="hrCardData" :isUnit="true"/>
  </view>
</template>

<script lang="ts" setup>
import dateBar from "./component/date-bar.vue";
import weeekAreaChart from "./component/hr-week-chart.vue";
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
</script>

<style scoped lang="less">
.hr-detail {
  padding: 16px 18px;
  
}
</style>
