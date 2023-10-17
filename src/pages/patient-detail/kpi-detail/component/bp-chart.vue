<template>
  <view class="show-info">
    <view>
      <view class="left">
        <text>{{ currentData }}</text>
        <text class="unit">正常高值</text>
      </view>
      <text>血压/mmHg</text>
    </view>
    <text>平均脉搏--/分钟</text>
  </view>
  <view class="charts-box">
    <qiun-data-charts
      type="line"
      :opts="chartData.opts"
      :chartData="chartData.data"
      @getIndex="getIndex"
    />

    <xaxisBar :xAxisData="xAxisData" v-if="optsObj.isXDisabled" />
  </view>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue";
import { onShow, onHide, onReady } from "@dcloudio/uni-app";
import { dateType } from "@/core/enum/dateType";
import xaxisBar from "./xaxis-bar.vue";

const props = defineProps({
  areaData: {
    type: Object,
    default: [],
  },
  type: {
    type: String,
    default: "day",
  },
});

const { type } = toRefs(props);

const currentData = ref("128/88");

const getData1 = () => {
  var arr: any = [];
  var q = 1696953600000;
  for (var i = 1; i < 100; i++) {
    arr.push(Math.random() * 10 + 80);
  }
  return arr;
};
const getData2 = () => {
  var arr: any = [];
  var q = 1696953600000;
  for (var i = 1; i < 100; i++) {
    arr.push([q - i * 3600 * 1000, Math.random() * 10 + 130]);
    q = q - i * 3600 * 1000;
  }
  return arr;
};

const optsObj = ref();
watch(
  () => type.value,
  (val) => {
    let xData = [];
    let isXDisabled = true;
    let data1 = [];
    let data2 = [];
    if (type.value === dateType.Day) {
      xData = getData2().map((item: any) => {
        return item[0];
      });
      isXDisabled = true;
      data1 = getData1();
      data2 = getData2().map((item: any) => {
        return item[1];
      });
    } else if (type.value === dateType.Week) {
      xData = ["周一", "周二", "周三", "周四", "周五", "周六", "周天"];
      isXDisabled = false;
      data1 = [130, 150, 120, 100, 170, 130, 120, 100, 150];
      data2 = [80, 60, 50, 70, 60, 30, 60, 70, 50];
    } else {
      xData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      isXDisabled = false;
      data1 = [130, 150, 120, 100, 170, 130, 120, 100, 150];
      data2 = [80, 60, 50, 70, 60, 30, 60, 70, 50];
    }
    optsObj.value = {
      xData: xData,
      isXDisabled: isXDisabled,
      data1: data1,
      data2: data2,
    };
  },
  { immediate: true }
);

const chartData = ref({
  opts: {
    color: [
      "#42BA3F",
      "#FF5D63",
      "#FAC858",
      "#EE6666",
      "#73C0DE",
      "#3CA272",
      "#FC8452",
      "#9A60B4",
      "#ea7ccc",
    ],
    padding: [15, 10, 0, 15],
    dataLabel: false,
    dataPointShape: false,
    enableScroll: false,
    legend: { show: false },
    xAxis: {
      disabled: optsObj.value.isXDisabled,
      disableGrid: true,
    },
    yAxis: {
      gridType: "dash",
      dashLength: 2,
      axisLine: false,

      data: [
        {
          axisLine: false,
          min: 0,
          max: 200,
        },
      ],
    },
    extra: {
      line: {
        // type: "curve",
        width: 2,
        activeType: "hollow",
        linearType: "custom",
        onShadow: true,
        animation: "horizontal",
      },

      markLine: {
        type: "dash",
        dashLength: 5,
        data: [
          {
            value: 140,
            lineColor: "#DE4A4A ",
            showLabel: true,
          },
          {
            value: 90,
            lineColor: "#09CCD5 ",
            showLabel: true,
          },
        ],
      },
      tooltip: {
        showBox: false,
        showCategory: true,
        showArrow: false,
        borderRadius: 2,
      },
    },
  },
  data: {
    categories: optsObj.value.xData,
    series: [
      {
        name: "高压",
        // linearColor: [
        //   [0, "#1890FF"],
        //   [0.25, "#00B5FF"],
        //   [0.5, "#00D1ED"],
        //   [0.75, "#00E6BB"],
        //   [1, "#90F489"],
        // ],
        setShadow: [3, 8, 10, "#1890FF"],
        data: optsObj.value.data1,
      },
      {
        name: "低压",
        data: optsObj.value.data2,
      },
    ],
  },
});
const xAxisData = ref(["00:00", "06:00", "12:00", "18:00", "24:00"]);
const getIndex = (e: any) => {
  //拿到当前索引值跟数据匹配，对时间进行改变
  let currentIndex = e.currentIndex.index;
  console.log(
    "e=======",
    optsObj.value.xData[currentIndex],
    optsObj.value.data1[currentIndex],
    optsObj.value.data2[currentIndex]
  );
  currentData.value = `${optsObj.value.data1[currentIndex].toFixed(
    0
  )}/${optsObj.value.data2[currentIndex].toFixed(0)}`;
};
</script>

<style scoped lang="less">
.show-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #4c5056;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 28rpx;
  padding: 20rpx 12rpx;

  .left {
    color: rgba(0, 29, 69, 0.9);
    font-size: 44rpx;
    font-weight: 700;
    line-height: 40rpx; /* 90.909% */
    padding: 4rpx 0;
    .unit {
      font-size: 28rpx;
      font-weight: 400;
      color: #45dde1;
    }
  }
}
.charts-box {
  width: 100%;
  height: 100%;
}
</style>
