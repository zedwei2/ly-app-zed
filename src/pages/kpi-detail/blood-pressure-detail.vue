<template>
  <view class="spo-detail">
    <dateBar />
    <bpChart />
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import bpChart from "./component/bp-chart.vue";
import dateBar from "./component/date-bar.vue";
</script>

<style scoped lang="less">
.spo-detail {
  padding: 16px 18px;
}
</style>
