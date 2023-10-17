<template>
  <view class="hr-chart">
    <!-- <view class="hr-chart-title"><text>65</text>次/分钟</view> -->
    <baseChart
      :chart="chart"
      :xAxisData="xAxisData"
      :xAxisHasActive="false"
      @getCurrentData="getCurrentData"
    />
  </view>
</template>

<script lang="ts" setup>
import baseChart from "./base-chart.vue";

const emit = defineEmits(["getCurrentData"]);

const getCurrentData = (data: string) => {
  emit("getCurrentData", data);
};

const getData = () => {
  var arr: any = [];
  var q = 1696953600000;
  for (var i = 1; i < 100; i++) {
    arr.push([q - i * 3600 * 1000, Math.random() * 10 + 80]);
    q = q - i * 3600 * 1000;
  }
  return arr;
};
const chart = {
  type: "area",
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
    padding: [15, 4, 10, 4],
    dataLabel: false,
    dataPointShape: false,
    legend: {
      show: false,
    },
    xAxis: {
      disabled: true,
      disableGrid: true,
      format: "xAxisDemo2",
      boundaryGap: "justify",
      fontColor: "#92969A",
      axisLine: false,
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
        show: false,
        showBox: false,
        splitLine: true,
        gridColor: "#FDDEDE",
      },
    },
  },
};

const xAxisData = ["00:00", "06:00", "12:00", "18:00", "24:00"];
</script>

<style lang="less">
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
  .custom-xaxis {
    display: flex;
    margin-left: 60rpx;
    justify-content: space-around;
    color: #92969a;
    font-size: 24rpx;
    font-weight: 500;
    line-height: 40rpx; /* 166.667% */
  }
}
</style>
