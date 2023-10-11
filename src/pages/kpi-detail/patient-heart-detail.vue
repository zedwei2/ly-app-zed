<template>
  <view class="hr-detail">
    <dateBar />
    <areaChart />
    <view class="hr-card">
      <view class="hr-card-item" v-for="item in hrCardData" :key="item.title">
        <view class="title">{{ item.title }}</view>
        <view class="value"
          ><text>{{ item.value }}</text
          >次/分钟</view
        >
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import dateBar from "./component/date-bar.vue";
import areaChart from "./component/area-chart.vue";
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
      &:first-child {
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
}
</style>
