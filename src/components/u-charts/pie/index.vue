<template>
  <view class="charts-box">
    <view class="chart">
      <QiunDataCharts
        type="arcbar"
        :opts="chartData.opts"
        :chart-data="chartData.data"
      />
    </view>

    <view class="info">
      <view>
        <!-- <van-icon name="circle" size="10" /> -->
        <view class="circle" :style="{ border: '3px solid #D7E4EB' }"></view>
        <text>患者总数({{ pieData.total }})</text>
      </view>
      <view>
        <view
          class="circle"
          :style="{ border: `3px solid ${pieData.color}` }"
        ></view>
        <text>{{ `${pieData.name}人数(${pieData.countHealth}) ` }}</text></view
      >
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import QiunDataCharts from "@/uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue";

const props = defineProps({
  pieData: {
    type: Object,
    default: {},
  },
});

const { pieData } = toRefs(props);

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
    padding: undefined,
    title: {
      name: pieData.value.rate * 100 + "%",
      fontSize: 22,
      color: "#2fc25b",
    },
    subtitle: {
      name: pieData.value.name + "占比",
      fontSize: 11,
      color: "#666666",
    },
    extra: {
      arcbar: {
        type: "circle",
        width: 9,
        backgroundColor: "#D7E4EB",
        startAngle: 1,
        endAngle: 0.25,
        gap: 2,
      },
    },
  },
  data: {
    series: [
      { name: "正确率", color: pieData.value.color, data: pieData.value.rate },
    ],
  },
});
</script>
<style lang="less" scoped>
.charts-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
  .info {
    display: flex;
    flex-direction: column;
    color: #92969a;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    .circle {
      display: inline-block;
      width: 4px;
      height: 4px;
      background: #ffffff;
      border-radius: 50%;
    }
  }
  .chart {
    height: 94px;
    overflow: hidden;
  }
}
</style>
