<template>
  <view class="spo-detail">
    <dateBar @changeDate="onDataChange" />
    <bpChart :type="timeType" v-if="isChartShow" />
    <tipLegend :tipData="legendData" />
    <view class="info">
      <view class="aver-info">
        <view>
          <text>血压平均值</text>
          <text>{{ pressureAver }}<text class="unit">mmHg</text></text>
        </view>
        <view>
          <text>脉搏平均值</text>
          <text>--<text class="unit">/分钟</text></text>
        </view>
      </view>
      <view>
        <!--待后续算法拓展-->
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import bpChart from "./component/bp-chart.vue";
import dateBar from "./component/date-bar.vue";
import tipLegend from "./component/tip-legend.vue";

const legendData = [
  {
    name: "高压(收缩压)",
    icon: "dangerous",
  },
  {
    name: "低压(舒张压)",
    icon: "success",
  },
];
const pressureAver = ref("128/88");
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
  padding: 16px 18px;
  .info {
    display: flex;
    flex-direction: column;
    border: solid 2rpx #e9eef0;
    border-radius: 8rpx;
    padding: 50rpx 32rpx;
    .aver-info {
      display: flex;
      justify-content: space-around;
      view:first-child {
        width: 50%;
        position: relative;
      }
      view:first-child::after {
        position: absolute; /*绝对定位*/
        top: 50%; /*Y轴方向偏移自身高度的50%*/
        transform: translatey(-40%); /*Y轴方向偏移微调*/
        right: 0; /*紧靠容器左边缘*/
        content: ""; /*伪元素需要有内容才能显示*/
        width: 2rpx; /*伪元素宽度*/
        height: 90rpx; /*伪元素高度*/
        background-color: #e9eef0; /*伪元素颜色*/
      }
      > view {
        display: flex;
        flex-direction: column;
        text:first-child {
          color: #4c5056;
          font-size: 26rpx;
          font-weight: 400;
        }
        text:last-child {
          padding-top: 20rpx;
          color: rgba(0, 29, 69, 0.9);
          font-size: 40rpx;

          font-weight: 700;
          line-height: 52rpx;
          .unit {
            font-size: 20rpx;

            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
