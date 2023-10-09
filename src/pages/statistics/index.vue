<template>
  <view class="statictis common-page common-success-bg">
    <view class="basic-info">
      <view>
        <text class="title title1">全部患者/人</text>
        <text class="warn number">{{ staticInfo.totalNo }}</text>
      </view>
      <view>
        <text class="title title2">预警患者/人</text>
        <text class="number">{{ staticInfo.warningNo }}</text>
      </view>
    </view>
    <view class="chart-content patient-distribution">
      <text class="title">患者分布</text>
      <view>
        <canvas
          canvas-id="f2-chart"
          id="myChart"
          width="100%"
          height="260"
          ref="myChart"
        ></canvas>
      </view>
      <view></view>
      <view></view>
      <view></view>
    </view>
    <view class="chart-content trend">
      <text class="title">患者趋势</text>
      <text class="title">因素分析</text>
    </view>
    <canvas ref="canvas"></canvas>

  </view>
</template>

<script lang="ts" setup>
import { defineComponent, ref, reactive, onMounted, nextTick, $ref } from "vue";
import uCharts from 'ucharts'

new uCharts({
  $this: $ref.canvas, // 传入canvas的引用
  type: 'column', // 图表类型，可以根据需求选择
  // 其他配置项...
});
// 绘制图表数据
$ref.chart.setData({
  categories: ['类别1', '类别2', '类别3'],
  series: [
    { name: '数据系列1', data: [30, 40, 20] },
    // 其他数据系列...
  ]
});

</script>

<style scoped lang="scss">
.statictis {
  padding: 10rpx 16rpx;
  .basic-info {
    display: flex;
    justify-content: space-around;
    > view:not(:last-child) {
      margin-right: 10rpx;
    }
    > view {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 12rpx 14rpx;
      border-radius: 4rpx;
      width: 100%;
      background: #fff;
      .title {
        font-weight: 500;
        font-size: 12rpx;
        color: #4c5056;
      }
      .title1 {
        &::before {
          display: inline-block;
          position: relative;
          top: 0;
          margin-right: 6rpx;
          border-radius: 2rpx;
          width: 4rpx;
          height: 10rpx;
          background: #007bff;
          content: '';
        }
      }
      .title2 {
        &::before {
          display: inline-block;
          position: relative;
          top: 0;
          margin-right: 6rpx;
          border-radius: 2rpx;
          width: 4rpx;
          height: 10rpx;
          background: #ff4141;
          content: '';
        }
      }
      .number {
        padding-left: 9rpx;
        padding-top: 9rpx;
        line-height: 22rpx;
        font-weight: 700;
        font-size: 22rpx;
        color: rgba(0, 29, 69, 0.9);
      }
    }
  }
  .chart-content {
    margin-top: 10rpx;
    padding: 12rpx;
    border-radius: 4rpx;
    background: #fff;
    .title {
      line-height: 26rpx; /* 162.5% */
      font-weight: 500;
      font-size: 16rpx;
      color: #242429;
    }
  }
}
</style>
