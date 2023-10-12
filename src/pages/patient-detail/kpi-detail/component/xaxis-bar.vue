<template>
  <view class="custom-xaxis">
    <text v-for="item in xAxisData" :key="item">{{ item }}</text>
  </view>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps({
  xAxisData: {
    type: Object,
    default: [],
  },
});

const { xAxisData } = toRefs(props);
</script>

<style lang="less" scoped>
.custom-xaxis {
  display: flex;
  margin-left: 60rpx;
  justify-content: space-around;
  color: #92969a;
  font-size: 24rpx;
  font-weight: 500;
  line-height: 40rpx; /* 166.667% */
}
</style>
