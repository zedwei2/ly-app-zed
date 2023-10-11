<template>
  <view class="charts-box">
    <qiun-data-charts
      type="column"
      :opts="chartData.opts"
      :chart-data="chartData.data"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";

const props = defineProps({
  areaData: {
    type: Object,
    default: [],
  },
});

const { areaData } = toRefs(props);
const getData = () => {
  var arr: any = [];
  var q = 1597910400000;
  for (var i = 1; i < 100; i += 15) {
    arr.push([q - i * 3600 * 1000, Math.random() * 5 + 80]);
    q = q - i * 3600 * 1000;
  }
  return arr;
};

const chartData = ref({
  opts: {
    color: ["#45DDE1"],
    padding: [15, 15, 0, 5],
    enableScroll: false,
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
      data: [
        {
          min: 0,
        },
      ],
    },
    extra: {
      column: {
        type: "group",
        width: 6,
        activeBgColor: "#09CCD5",
        activeBgOpacity: 0.08,
        // linearType: "custom",
        seriesGap: 1000,
        // linearOpacity: 0.5,
        barBorderCircle: true,
        // customColor: ["#09CCD5", "#45DDE1"],
      },
    },
  },
  data: {
    categories: getData().map((item) => {
      return item[0];
    }),
    series: [
      {
        name: "血氧饱和度",
        data: getData().map((item) => {
          return item[1];
        }),
      },
    ],
  },
});
</script>

<style scoped lang="less">
.charts-box {
  width: 100%;
  height: 100%;
}

</style>
