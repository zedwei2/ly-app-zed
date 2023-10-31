<template>
  <view class="chart-content">
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

      <xaxisBar :type="type" :activeIndex="activeIndex" />
      <tipLegend :tipData="legendData" />
    </view>
  </view>

  <view class="info">
    <view class="aver-info">
      <view>
        <text>血压平均值</text>
        <text>{{ currentData }}<text class="unit">mmHg</text></text>
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
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue";

import { dateType } from "@/core/enum/dateType";
import xaxisBar from "./xaxis-bar.vue";
import tipLegend from "./tip-legend.vue";

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
const activeIndex = ref<number>(0);
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

const getData1 = () => {
  var arr: any = [];
  var q = 1696953600000;
  for (var i = 1; i < 100; i++) {
    arr.push(Math.random() * 10 + 133);
  }
  return arr;
};
const getData2 = () => {
  var arr: any = [];
  var q = 1696953600000;
  for (var i = 1; i < 100; i++) {
    arr.push([q - i * 3600 * 1000, Math.random() * 10 + 82]);
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
      "#FF5D63",
      "#42BA3F",

      "#FAC858",
      "#EE6666",
      "#73C0DE",
      "#3CA272",
      "#FC8452",
      "#9A60B4",
      "#ea7ccc",
    ],
    padding: [10, 20, 10, 10],
    dataLabel: false,
    dataPointShape: false,
    enableScroll: false,
    legend: { show: false },
    xAxis: {
      // disabled: optsObj.value.isXDisabled,
      disabled: true,
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
            lineColor: "#FF5D63 ",
            showLabel: true,
          },
          {
            value: 90,
            lineColor: "#42BA3F ",
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
        // setShadow: [3, 8, 10, "#1890FF"],
        data: optsObj.value.data1,
      },
      {
        name: "低压",
        data: optsObj.value.data2,
      },
    ],
  },
});
const getIndex = (e: any) => {
  //拿到当前索引值跟数据匹配，对时间进行改变
  let currentIndex = e.currentIndex.index;
  if (currentIndex < 0) return;
  activeIndex.value = currentIndex;
  console.log(
    "e=======",
    optsObj.value.xData[currentIndex],
    optsObj.value.data1[currentIndex],
    optsObj.value.data2[currentIndex]
  );
  if (!optsObj.value.xData[currentIndex]) return;
  currentData.value = `${optsObj.value.data1[currentIndex].toFixed(
    0
  )}/${optsObj.value.data2[currentIndex].toFixed(0)}`;
};
</script>

<style scoped lang="less">
.chart-content {
  border: solid 2rpx #e9eef0;
  border-radius: 8rpx;
  margin-bottom: 32rpx;
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
}

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
</style>
