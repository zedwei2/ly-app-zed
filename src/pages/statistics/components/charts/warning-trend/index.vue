<template>
  <view class="charts-box">
    <qiun-data-charts type="line" :opts="opts" :chart-data="chartData" />
  </view>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue";

import { attributeMappings } from "../../../mapping";
import { onShow } from "@dcloudio/uni-app";

import twinsService from "@/api/twins-service";
import common from "@/utils/common";

const props = defineProps({
  dateType: {
    type: String,
    default: "",
  },
});

const { dateType } = toRefs(props);

const opts = {
  color: [
    "#F5B763",
    "#61B8FF",
    "#0066B1",
    "#41DADF",
    "#FF4141",
    "#3CA272",
    "#FC8452",
    "#9A60B4",
    "#ea7ccc",
  ],
  enableScroll: false,
  dataLabel: false,
  legend: {
    position: "top",
    fontSize: 12,
    margin: 12,
  },
  xAxis: {
    disableGrid: true,
    axisLine: false,
    data: [{ axisLine: false }],
    labelCount: 4,
  },
  yAxis: {
    gridType: "dash",
    dashLength: 4,
    gridColor: "#ECF1F6",
    data: [{ axisLine: false }],
  },

  extra: {
    line: {
      type: "straight",
      width: 2,
      activeType: "hollow",
    },
  },
};

const chartData = ref({});

/**预警趋势分析统计数据 */
const getChartData = (type: string) => {
  twinsService
    .queryWarningTrend(type)
    .then((res) => {
      let data = (res as any).data;
      const lines: any[] = [];
      const categories = data.map((item: any) => {
        if (dateType.value === "DAY") {
          return item.date.split(" ")[1];
        } else {
          return item.date;
        }
      });
      data.forEach((item: any) => {
        for (const key in item.value) {
          if (item.value.hasOwnProperty(key)) {
            const attributeInfo = attributeMappings[key];
            const existingLine = lines.find((line) => line.keys === key);
            const value = item.value[key];

            if (existingLine) {
              existingLine.data.push(value);
            } else {
              if (common.isNotBlank(attributeMappings[key])) {
                lines.push({
                  name: attributeInfo.name,
                  data: [value],
                  keys: key,
                  legendShape: "circle",
                  pointShape: "none",
                });
              }
            }
          }
        }
      });
      chartData.value = {
        series: lines,
        categories: categories,
      };
    })
    .catch((err) => {
      console.log("yujing====err", err);
    });
};

watch(
  () => dateType.value,
  (val) => {
    if (val) {
      getChartData(val);
    }
  },
  {
    immediate: true,
  }
);
</script>
<style lang="less" scoped>
.charts-box {
  width: 100%;
}
</style>
