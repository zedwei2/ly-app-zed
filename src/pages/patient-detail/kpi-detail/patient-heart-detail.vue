<template>
  <view class="hr-detail">
    <dateBar @changeDate="onDataChange" />
    <baseChart :type="activeType" />
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import dateBar from "./component/date-bar.vue";
import baseChart from "./component/base-chart.vue";

const activeType = ref("day"),
  currentDate = ref();
const onDataChange = (type: string) => {
  activeType.value = type;
};
</script>

<style scoped lang="less">
.hr-detail {
  padding: 32rpx 36rpx;
}
</style>
