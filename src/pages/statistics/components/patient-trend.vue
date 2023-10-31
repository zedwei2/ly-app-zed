<template>
  <view class="charts-box">
    <qiun-data-charts
      type="area"
      :opts="chartData.opts"
      :chart-data="chartData.data"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";

const props = defineProps({
  // areaData: {
  //   type: Object,
  //   default: [],
  // },

  /**所选时间范围 */
  dateRange: {
    type: String,
  },
});

// const { areaData } = toRefs(props);

const trendData = ref({
  categories: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"],
  series: [
    {
      data: [35, 38, 35, 37, 24, 30, 28, 25, 37],
    },
  ],
});

const chartData = ref({
  opts: {
    color: [
      "#43B9BE", //线条颜色
      "#91CB74",
      "#FAC858",
      "#EE6666",
      "#73C0DE",
      "#3CA272",
      "#FC8452",
      "#9A60B4",
      "#ea7ccc",
    ],
    padding: [],
    enableScroll: false,
    dataLabel: false,
    dataPointShape: false, //不展示数据点
    legend: {
      show: false, //是否展示图例
    },
    xAxis: {
      disableGrid: true,
      gridType: "dash",
    },
    yAxis: {
      gridType: "dash",
      dashLength: 2,
      data: [
        {
          axisLine: false,
          fontColor: "#92969A",
        },
      ],
    },
    extra: {
      area: {
        type: "straight",
        opacity: 0.3,
        addLine: true,
        width: 2,
        gradient: true,
        activeType: "hollow",
      },
    },
  },
  data: trendData.value,
});
</script>

<style scoped lang="less">
.charts-box {
  width: 100%;
  height: 100%;
}
</style>
