<template>
  <view class="hr-detail">
    <dateBar />
    <view class="hr-chart">
      <view class="hr-chart-title"><text>65</text>次/分钟</view>
      <qiun-data-charts
        type="area"
        :opts="chart.opts"
        :chartData="chart.chartData"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import dateBar from "./component/date-bar.vue";

const getData = () => {
  var arr: any = [];
  var q = 1597910400000;
  for (var i = 1; i < 100; i++) {
    arr.push([q - i * 3600 * 1000, Math.random() * 10 + Math.random() * 30]);
    q = q - i * 3600 * 1000;
  }
  return arr;
};
console.log(getData());
const chart = {
  chartData: {
    series: [
      {
        data: getData(),
      },
    ],
  },
  opts: {
    color: [
      "#FF5D63",
      "#91CB74",
      "#FAC858",
      "#EE6666",
      "#73C0DE",
      "#3CA272",
      "#FC8452",
      "#9A60B4",
      "#ea7ccc",
    ],
    dataLabel: false,
    dataPointShape: false,
    legend: {
      show: false,
    },
    xAxis: {
      disableGrid: true,
      boundaryGap: "justify",
      format: "xAxisDemo2",
      fontColor: "#92969A",
      axisLine: false,
      labelCount: 5,
    },
    yAxis: {
      gridType: "dash",
      dashLength: 2,
      data: [
        {
          axisLine: false,
          fontColor: "#92969A",
          min: 40,
          max: 140,
        },
      ],
    },
    extra: {
      area: {
        type: "curve",
        opacity: 0.2,
        addLine: true,
        width: 2,
        gradient: true,
        activeType: "hollow",
      },
      tooltip: {
        showBox: false,
        splitLine: true,
        gridColor: "#FDDEDE",
      },
    },
  },
};
</script>

<style scoped lang="less">
.hr-detail {
  padding: 16px 18px;
  .hr-chart {
    border: 2rpx solid #e9eef0;
    padding: 32rpx 10rpx 20rpx 0;
    border-radius: 20rpx;
    .hr-chart-title {
      color: #92969a;
      font-size: 20rpx;
      line-height: 44rpx;
      text-align: center;
      margin-bottom: 16rpx;
      text {
        color: rgba(0, 29, 69, 0.9);
        font-size: 60rpx;
        font-weight: 700;
        line-height: 72rpx;
        margin-right: 12rpx;
      }
    }
  }
}
</style>
