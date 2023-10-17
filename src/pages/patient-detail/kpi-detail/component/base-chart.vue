<template>
  <view class="hr-chart-title"
    ><text>{{ currentData }}</text
    ><text class="unit">次/分钟</text></view
  >
  <view class="chart-content">
    <qiun-data-charts
      :type="chart?.type"
      :opts="chart?.opts"
      :chartData="chart?.chartData"
      @getIndex="getIndex"
    />

    <xaxisBar :type="type" :activeIndex="activeIndex" />
  </view>
  <infoCard :infoData="hrCardData" :isUnit="true" />
</template>

<script setup lang="ts">
import { toRefs, ref, reactive, watch, computed } from "vue";

import { dateType } from "@/core/enum/dateType";

import infoCard from "./info-card.vue";
import xaxisBar from "./xaxis-bar.vue";

const props = defineProps({
  type: {
    type: String,
    default: "day",
  },
});

// const emit = defineEmits(["getCurrentData"]);

/**当前选中的数据 */
const activeIndex = ref<number>(0);
const currentData = ref<String>("65");
const hrCardData = reactive([
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
]);

let { type } = toRefs(props);
const getData = () => {
  var arr: any = [];
  var q = 1696953600000;
  for (var i = 1; i < 100; i++) {
    arr.push([q - i * 3600 * 1000, Math.random() * 10 + 80]);
    q = q - i * 3600 * 1000;
  }
  return arr;
};
const chart1 = {
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
const chart2 = {
  type: "candle",
  chartData: {
    categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    series: [
      {
        name: "dada",
        data: [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [60, 70, 70, 70],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [80, 90, 80, 80], // 第一个下限 第二个上限 第三个上影线 第四个下影线
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
      },
    ],
  },
  opts: {
    rotate: false,
    rotateLock: false,
    color: [
      "#FF6C71",
      "#FF6C71",
      "#FF6C71",
      "#FF6C71",
      "#FF6C71",
      "#FF6C71",
      "#FF6C71",
      "#FF6C71",
      "#FF6C71",
    ],
    padding: [15, 4, 10, 4],
    dataLabel: false,
    enableScroll: false,
    legend: {
      show: false,
    },
    xAxis: {
      disabled: true,
    },
    yAxis: {
      gridType: "dash",
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
      tooltip: {
        show: false,
        showBox: false,
        splitLine: true,
        gridColor: "#FDDEDE",
      },
    },
  },
};

/**以日为周期和以其他时间轴为周期图表配置不同 */
const chart = computed(() => {
  return type.value === dateType.Day ? chart1 : chart2;
});

watch(
  () => type.value,
  () => {
    activeIndex.value = 0;
  },
  {
    immediate: true,
  }
);

/**
 * 点击图表与x轴和展示数据联动
 * @param val
 */
const getIndex = (val: any) => {
  if (val.currentIndex.index < 0) return;
  //获取当前点击的图表数据
  let currentItem = val.opts.series[0].data[val.currentIndex.index];
  if (type.value === "day") {
    currentData.value = currentItem[1].toFixed(0);
  } else {
    currentData.value = `${currentItem[0]}-${currentItem[1]}`;
  }
  hrCardData[0].value = currentData.value.toString();
  // emit("getCurrentData", currentData.value);
  activeIndex.value = val.currentIndex.index;
};
</script>

<style lang="less" scoped>
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
  .unit {
    color: #92969a;
    font-size: 20rpx;
    font-weight: 400;
    line-height: 44rpx; /* 220% */
  }
}
.chart-content {
  border: 2rpx solid #e9eef0;
  padding: 32rpx 10rpx 20rpx 0;
  border-radius: 20rpx;
}
</style>
