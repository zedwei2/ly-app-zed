<template>
  <view class="charts-box">
    <QiunDataCharts
      type="funnel"
      :opts="chartData.opts"
      :chart-data="chartData.data"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import QiunDataCharts from "@/uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue";

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
    padding: [15, 15, 0, 15],
    enableScroll: false,
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
            // labelShow:false
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
