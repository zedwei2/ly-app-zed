<template>
  <view class="charts-box">
    <qiun-data-charts
      type="area"
      :opts="chartData.opts"
      :chart-data="chartData.data"
    />
    <qiun-data-charts type="mix" :opts="opts" :chartData="testData" />
  </view>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from "vue";
import { onShow, onHide, onReady } from "@dcloudio/uni-app";

const props = defineProps({
  areaData: {
    type: Object,
    default: [],
  },
});

const { areaData } = toRefs(props);

const chartData = ref({
  opts: {
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
    padding: [15, 10, 0, 15],
    enableScroll: false,
    legend: {},
    xAxis: {
      disableGrid: true,
      boundaryGap: "justify",
      format: "xAxisDemo2",
    },
    yAxis: {
      gridType: "dash",
      dashLength: 2,
      data: [
        {
          min: 40,
          max: 200,
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
    },
  },
  data: {
    series: [
      {
        name: "时间轴1",
        data: [
          [0, 140],
          [30000, 140],
          [50000, 140],
          [70000, 140],
          [90000, 140],
        ],
      },
      {
        name: "时间轴2",
        data: [
          [0, 90],
          [30000, 90],
          [50000, 90],
          [70000, 90],
          [90000, 90],
        ],
      },
    ],
  },
});

const opts = {
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
  enableScroll: false,
  legend: {},
  xAxis: {
    disableGrid: true,
    title: "单位：年",
  },
  yAxis: {
    disabled: false,
    disableGrid: false,
    splitNumber: 5,
    gridType: "dash",
    dashLength: 4,
    gridColor: "#CCCCCC",
    padding: 10,
    showTitle: true,
    data: [
      {
        position: "left",
        title: "折线",
      },
      {
        position: "right",
        min: 0,
        max: 200,
        title: "柱状图",
        textAlign: "left",
      },
      {
        position: "right",
        min: 0,
        max: 200,
        title: "点",
        textAlign: "left",
      },
    ],
  },
  extra: {
    mix: {
      column: {
        width: 20,
      },
    },
  },
};
let testData = ref();

const getServerData = () => {
  setTimeout(() => {
    //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
    let res = {
      categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
      series: [
        {
          name: "曲面",
          type: "area",
          style: "curve",
          data: [70, 50, 85, 130, 64, 88],
        },
        {
          name: "曲线",
          type: "line",
          style: "curve",
          color: "#1890ff",
          disableLegend: true,
          data: [70, 50, 85, 130, 64, 88],
        },
        {
          name: "点",
          index: 2,
          type: "point",
          color: "#f04864",
          data: [100, 80, 125, 150, 112, 132],
        },
      ],
    };
    testData.value = JSON.parse(JSON.stringify(res));
  }, 500);
};

onShow(() => {
  getServerData();
});
</script>

<style scoped lang="less">
.charts-box {
  width: 100%;
  height: 100%;
}
</style>
