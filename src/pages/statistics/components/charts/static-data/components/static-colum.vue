<template>
  <view class="charts-box">
    <view>
      {{ AlertTypeRange[alertType] }}
      <span class="num" :style="{ color: '#11A5AC' }">{{
        trendData.warningTypeTotal
      }}</span
      >人
    </view>
    <view class="chart">
      <qiun-data-charts
        v-if="isChartShow"
        type="mount"
        :opts="chartData.opts"
        :chartData="chartData.data"
      />
    </view>
    <view class="warning-percent">
      <view v-for="(item, index) in trendData.percentList">
        <span class="num" :style="{ color: item.color }"
          >{{ item.percent }}%</span
        >
        <span>{{ item.name }}</span>
        <van-progress
          :percentage="item.percent"
          stroke-width="8"
          :color="item.color"
          :show-pivot="false"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue";

import { AlertTypeRange } from "@/pages/statistics/mapping";
import common from "@/utils/common";

const props = defineProps({
  trendData: {
    type: Object,
    default: [],
  },
  alertType: {
    type: String,
    default: "",
  },
});

const { alertType, trendData } = toRefs(props);
const isChartShow = ref(false);

const chartData = ref({
  opts: {},
  data: {},
});

watch(
  () => trendData.value,
  (val) => {
    if (common.isNotBlank(val)) {
      chartData.value = {
        opts: {
          color: val.data.map((item: any) => {
            return "#11A5AC";
          }),
          enableScroll: false,
          dataLabel: false,
          dataPointShape: false,
          legend: {
            show: false,
          },
          xAxis: {
            disableGrid: true,
            axisLine: false,
            labelCount: 2,
            data: [{ axisLine: false }],
          },
          yAxis: {
            gridType: "dash",
            dashLength: 4,
            gridColor: "#ECF1F6",
            splitNumber: 3,
            data: [
              {
                axisLine: false,
                axisLineColor: "#fff",
                min: 0,
              },
            ],
          },
          extra: {
            mount: {
              type: "bar",
              widthRatio: 0.13,
              borderWidth: 0,
              barBorderRadius: [50, 50, 50, 50],
            },
          },
        },
        data: {
          series: [
            {
              data: val.data,
            },
          ],
        },
      };
      isChartShow.value = true;
    } else {
      isChartShow.value = false;
    }
  }
);
</script>
<style lang="less" scoped>
.charts-box {
  width: 100%;
  padding-top: 40rpx;
  color: rgba(0, 29, 69, 0.9);
  font-size: 24rpx;
  font-weight: 400;
  .chart {
    height: 216rpx;
    padding: 24rpx 0;
  }

  .warning-percent {
    display: flex;
    justify-content: space-around;
    > view {
      width: 40%;
      display: flex;
      flex-direction: column;
      > span {
        padding: 6rpx 0;
      }
    }
  }
  .num {
    font-size: 40rpx;
    font-weight: 500;
  }
}
</style>
