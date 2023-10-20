<template>
  <view class="spo-detail">
    <dateBar @changeDate="onDataChange" />
    <bpChart :type="timeType" v-if="isChartShow" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import bpChart from "./component/bp-chart.vue";
import dateBar from "./component/date-bar.vue";
import tipLegend from "./component/tip-legend.vue";

const isChartShow = ref(true);

const timeType = ref("day");
const onDataChange = (type: string) => {
  isChartShow.value = false;
  timeType.value = type;
  setTimeout(() => {
    isChartShow.value = true;
  }, 100);
};
</script>

<style scoped lang="less">
.spo-detail {
  padding: 32rpx 36rpx;
}
</style>
