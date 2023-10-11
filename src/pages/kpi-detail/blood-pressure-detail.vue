<template>
  <view class="spo-detail">
    <dateBar />
    <tareaChart />
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import tareaChart from "@/components/u-charts/tarea/index.vue";
import dateBar from "./component/date-bar.vue";
</script>

<style scoped lang="less">
.spo-detail {
  padding: 16px 18px;
}
</style>
