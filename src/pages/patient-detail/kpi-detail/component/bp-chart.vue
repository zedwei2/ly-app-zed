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
    dataLabel: false,
    dataPointShape: false, //不展示数据点
    padding: [15, 10, 0, 15],
    enableScroll: false,
    legend: {},
    xAxis: {
      disableGrid: true,
      boundaryGap: "justify",
      format: "xAxisDemo2",
      axisLine: false,
    },
    yAxis: {
      gridType: "dash",
      dashLength: 2,
      data: [
        {
          axisLine: false,
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
        markLine: {
          symbol: ["none", "none"], // 去掉箭头
          label: {
            show: false,
            position: "start",
            formatter: "{b}",
          },
          data: [
            {
              name: "阈值",
              yAxis: 120,
            },
          ],
          lineStyle: {
            color: "#f00",
          },
        },
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
        disabled: true,
        position: "right",
        min: 0,
        max: 200,
        title: "柱状图",
        textAlign: "left",
      },
      {
        position: "right",
        disabled: true,
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
const ops = {
  color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666"],
  padding: [15, 10, 0, 15],
  legend: {},
  xAxis: {
    disableGrid: true,
    boundaryGap: "justify",
  },
  yAxis: {
    gridType: "dash",
    dashLength: 2,
  },
  extra: {
    area: {
      type: "curve",
      opacity: 0.2,
      addLine: true,
      width: 2,
      gradient: true,
    },
    scatter: {
      data: [
        [20000, 45],
        [40000, 35],
        [60000, 45],
        [80000, 35],
      ], // 散点数据为空，稍后会动态添加
      symbolSize: 6, // 散点的大小
      itemStyle: {
        color: "red", // 散点的颜色
      },
    },
  },
};

const testData1 = [
  {
    name: "面积图1",
    data: [
      [10000, 55],
      [30000, 25],
      [50000, 55],
      [70000, 25],
      [90000, 55],
    ],
  },
  {
    name: "面积图2",
    data: [
      [10000, 40],
      [30000, 30],
      [50000, 40],
      [70000, 30],
      [90000, 40],
    ],
  },
];

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
          data: [90, 90, 90, 90, 90, 90],
        },
        {
          name: "曲面",
          type: "area",
          style: "curve",
          data: [140, 140, 140, 140, 140, 140],
        },
        {
          name: "曲线",
          type: "line",
          style: "curve",
          color: "#1890ff",
          disableLegend: true,
          data: [90, 90, 90, 90, 90, 90],
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
