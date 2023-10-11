<template>
  <view class="charts-box">
    <qiun-data-charts
      type="funnel"
      :opts="chartData.opts"
      :chart-data="chartData.data"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";

const props = defineProps({
  reasonData: {
    type: Object,
    default: {},
  },
});

const { reasonData } = toRefs(props);

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
    padding: [15, 60, 0, 0],
    enableScroll: false,
    legend: {
      show: false, //是否展示图例
    },
    extra: {
      funnel: {
        activeOpacity: 0.3,
        activeWidth: 10,
        border: false,
        borderWidth: 2,
        borderColor: "#FFFFFF",
        fillOpacity: 1,
        labelAlign: "right",
        linearType: "custom",
        minSize: 20,
      },
      markLine: {
        showLabel: false, // 启用标签显示
        labelText: "{b}: {c}", // 标签格式化，{b} 表示标签名，{c} 表示标签值
      },
    },
  },
  data: {
    series: [
      {
        data: reasonData.value.map((item: any) => {
          return {
            name: item.name,
            value: item.value,
            centerText: item.value.toString(),
            labelText: `${item.name} ${item.value}`, // 标签
            labelFontSize: 10,
            // labelShow: false,
          };
        }),
      },
    ],
  },
});
</script>
<style lang="less" scoped>
.charts-box {
  width: 100%;
}
</style>
