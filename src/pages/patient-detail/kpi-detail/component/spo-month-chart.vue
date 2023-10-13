<template>
  <view class="hr-chart">
    <view class="hr-chart-title"
      ><text>{{ currentData }}</text></view
    >
    <qiun-data-charts
      type="column"
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
  color: [
    "transparent", //将最下面的柱子设置成透明颜色，显示悬浮效果
    // "#DE4A4A",
    // "#DE4A4A",
    "#FE7302",
    "#FE7302", //第二第三的颜色保持一致，造成90以下颜色统一的效果
    "#45DDE1",
    "#73C0DE",
    "#3CA272",
    "#FC8452",
    "#9A60B4",
    "#ea7ccc",
  ],
  padding: [15, 15, 0, 5],
  enableScroll: false,
  dataLabel: false,
  legend: {
    show: false,
  },
  xAxis: {
    disableGrid: true,
  },
  yAxis: {
    // disabled: true,
    data: [
      {
        min: 0,
      },
    ],
  },

  extra: {
    column: {
      type: "stack",
      width: 10,
      activeBgColor: "#000000",
      activeBgOpacity: 0.08,
      labelPosition: "center",
      //圆角未生效
      barBorderCircle: true,
      barBorderRadius: [10, 10, 10, 10],
    },
    tooltip: {
      showBox: false,
      splitLine: false,
      gridColor: "#FDDEDE",
      legendShow: false,
    },
  },
};
const chartDataTest = {
  categories: ["周一", "周二", "周三", "周四", "周五", "周六"],
  series: [
    {
      name: "低阈值",
      data: [80, 78, 62, 78, 80, 60],
    },
    {
      name: "low-data",
      data: [80, 78, 62, 78, 80, 60],
    },
    {
      name: "高阈值",
      data: [90, 94, 126, 94, 90, 126],
    },
    {
      name: "hight-data",
      data: [95, 96, 91, 93, 93, 94],
    },
  ],
};

const getIndex = (e: any) => {
  //获取档期数据的实际值
  let currentIndex = e.currentIndex.index;
  let lowData = e.opts.series.find((item: any) => item.name === "low-data");
  let howData = e.opts.series.find((item: any) => item.name === "hight-data");
  currentData.value = `${lowData.data[currentIndex]}%-${howData.data[currentIndex]}%`;
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
