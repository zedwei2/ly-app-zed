<template>
  <view class="hr-chart">
    <view class="hr-chart-title"
      ><text>{{ currentData }}</text></view
    >
    <!-- <qiun-data-charts
      type="column"
      :opts="optsTest"
      :chartData="chartDataTest"
      @getIndex="getIndex"
    /> -->
    <qiun-data-charts
      type="candle"
      :opts="optsTest"
      :chartData="chartDataTest"
      @getIndex="getIndex"
    />
    <view class="custom-xaxis" v-if="type === 'day'">
      <text
        v-for="item in xAxisData"
        :class="item.isActive ? 'active' : ''"
        :key="item.name"
        >{{ item.name }}</text
      >
    </view>
    <tipLegend :tipData="legendData" />
  </view>
</template>

<script lang="ts" setup>
import { ref, toRefs } from "vue";
import tipLegend from "./tip-legend.vue";

const props = defineProps({
  type: {
    type: String,
    default: "day",
  },
});
const { type } = toRefs(props);

const currentData = ref("89%-100%");

const xAxisData = [
  {
    name: "1",
    isActive: false,
  },
  {
    name: "2",
    isActive: false,
  },
  {
    name: "3",
    isActive: false,
  },
  {
    name: "4",
    isActive: false,
  },
  {
    name: "5",
    isActive: false,
  },
  {
    name: "6",
    isActive: false,
  },
  {
    name: "7",
    isActive: false,
  },
  {
    name: "8",
    isActive: false,
  },
  {
    name: "9",
    isActive: true,
  },
  {
    name: "10",
    isActive: false,
  },
  {
    name: "11",
    isActive: false,
  },
  {
    name: "12",
    isActive: false,
  },
];

const legendData = [
  {
    name: "<70%",
    icon: "dangerous",
  },
  {
    name: "70-89%",
    icon: "warning",
  },
  {
    name: "≥90%",
    icon: "success",
  },
];

const optsTest = {
  rotate: false,
  rotateLock: false,
  color: [
    "#1890FF",
    "#91CB74",
    "#FAC858",
    "#EE6666",
    "#73C0DE",
    "#3CA272",
    "#FC8452",
    "#9A60B4",
    "#ea7ccc",
  ],
  padding: [15, 15, 0, 15],
  dataLabel: false,
  enableScroll: true,
  enableMarkLine: true,
  legend: {
    show: false,
  },
  xAxis: {
    // disabled: true,
    labelCount: 0,
    gridType: "dash",
    scrollShow: false,
  },
  yAxis: {
    gridType: "dash",
    dashLength: 2,
    data: [
      {
        fontColor: "#92969A",
        format: "yAxisDemo1",
        min: 0,
        max: 100,
      },
    ],
  },
  extra: {
    candle: {
      color: {
        upLine: "#09CCD5",
        upFill: "#09CCD5",
        downLine: "#FE7302",
        downFill: "#FE7302",
      },
    },
    markLine: {
      type: "dash",
      dashLength: 5,
      data: [
        {
          value: 90,
          lineColor: "#f04864",
          showLabel: true,
          labelText: "90%",
        },
      ],
    },
    tooltip: {
      show: false,
      showBox: false,
    },
  },
};
const chartDataTest = {
  categories: ["周一", "周二", "周三", "周四", "周五", "周六"],
  series: [
    {
      name: "low-data",
      lineColor: "#FE7302",
      data: [
        [60, 80, 60, 60],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [60, 90, 60, 60], // 第一个下限 第二个上限 第三个上影线 第四个下影线
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    },
    {
      name: "hight-data",
      lineColor: "black",
      data: [
        [80, 90, 80, 90],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [95, 90, 95, 90], // 第一个下限 第二个上限 第三个上影线 第四个下影线
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    },
  ],
};

const getIndex = (e: any) => {
  //获取档期数据的实际值
  let currentIndex = e.currentIndex.index;
  let lowData = e.opts.series.find((item: any) => item.name === "low-data");
  let howData = e.opts.series.find((item: any) => item.name === "hight-data");
  currentData.value = `${lowData.data[currentIndex][0]}%-${howData.data[currentIndex][1]}%`;
};
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
    text-align: center;
    justify-content: space-around;
    align-items: center;
    color: #92969a;
    font-size: 24rpx;
    font-weight: 500;
    text {
      width: 32rpx;
      height: 32rpx;
      line-height: 32rpx;
      &.active {
        color: #fff;
        border-radius: 8rpx;
        background: linear-gradient(180deg, #ff5d63 0%, #de4a4a 100%);
      }
    }
  }
}
</style>
