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
  areaData: {
    type: Object,
    default: [],
  },
});

const { areaData } = toRefs(props);

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
    dataPointShape: false, //不展示数据点
    legend: {
      show: false, //是否展示图例
    },
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
