<template>
  <view class="card-info">
    <span :style="{ color: cardInfo.color }">{{ cardInfo.number }}</span>
    <span>{{ cardInfo.label }}</span>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  cardInfo: {
    type: Object,
    default: {},
  },
});
</script>
<style lang="less" scoped>
.card-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 8rpx;
  width: 100%;
  padding: 22rpx 0 16rpx 0;
  > span:first-child {
    font-size: 36rpx;
    font-weight: 700;
    line-height: 36rpx;
    padding-bottom: 12rpx;
  }
  > span:last-child {
    color: #4c5056;
    font-size: 11px;
    font-weight: 400;
    line-height: 12px;
  }
}
</style>
