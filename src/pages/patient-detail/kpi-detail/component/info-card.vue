<template>
  <view class="hr-card">
    <view
      :class="isUnit ? 'hr-card-item has-red' : 'hr-card-item'"
      v-for="item in infoData"
      :key="item.title"
    >
      <view class="title">{{ item.title }}</view>
      <view class="value"
        ><text>{{ item.value }}</text> {{ isUnit ? "次/分钟" : "" }}</view
      >
    </view>
  </view>
</template>

<script lang="ts" setup>
defineProps({
  isUnit: {
    type: Boolean,
    default: false,
  },
  infoData: {
    type: Array,
    default: [],
  },
});
</script>

<style lang="less">
.hr-card {
  display: flex;
  flex-wrap: wrap;
  margin-top: 32rpx;
  .hr-card-item {
    flex-basis: calc(50% - 68rpx);
    border: 2rpx solid #e9eef0;
    margin-bottom: 30rpx;
    border-radius: 20rpx;
    padding: 24rpx;
    &.has-red:first-child {
      background: #ff6c71;
      color: white;
    }
    &:nth-child(odd) {
      margin-right: 30rpx;
    }
    .title {
      font-size: 24rpx;
      line-height: 24rpx;
      margin-bottom: 20rpx;
    }
    .value {
      font-size: 20rpx;
      line-height: 24rpx;
      text {
        font-size: 40rpx;
        font-weight: 700;
        line-height: 52rpx;
        margin-right: 8rpx;
      }
    }
  }
}
</style>
