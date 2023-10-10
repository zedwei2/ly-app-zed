<template>
  <view class="charts-box">
    <QiunDataCharts
      type="area"
      :opts="chartData.opts"
      :chart-data="chartData.data"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import QiunDataCharts from "@/uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue";

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
    padding: [15, 0, 0, 15],
    enableScroll: false,
    legend: {},
    xAxis: {
      disableGrid: true,
    },
    yAxis: {
      gridType: "dash",
      dashLength: 2,
    },
    extra: {
      area: {
        type: "straight",
        opacity: 0.2,
        addLine: true,
        width: 2,
        gradient: true,
        activeType: "hollow",
      },
    },
  },
  data: areaData.value,
});
</script>

<style scoped lang="less">
.charts-box {
  width: 100%;
  height: 100%;
}
</style>
