<template>
  <view class="charts-box">
    <view class="chart">
      <qiun-data-charts
        v-if="isChartShow"
        type="ring"
        :opts="chartData.opts"
        :chartData="chartData.data"
        tooltipFormat="tooltipRing1"
      />
    </view>
    <view class="legend">
      <view v-for="(item, index) in pieData" :key="index" class="item">
        <span class="tip" :style="{ background: item.color }"></span>
        <view>
          <span>{{ item.name }}</span>
          <view :style="{ color: item.color }">{{ item.value }}%</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import common from "@/utils/common";
import { ref, toRefs, watch } from "vue";

const props = defineProps({
  pieData: {
    type: Object,
    default: [],
  },
});

const { pieData } = toRefs(props);
const isChartShow = ref(false);
const chartData = ref({});

watch(pieData.value, (val) => {
  if (common.isNotBlank(val)) {
    chartData.value = {
      opts: {
        rotate: false,
        rotateLock: false,
        color: pieData.value.map((item: any) => item.color),
        // padding: [5, 5, 5, 5],
        dataLabel: false,
        enableScroll: false,
        title: {
          name: "",
          fontSize: 15,
          color: "#666666",
        },
        subtitle: {
          name: "",
          fontSize: 25,
          color: "#7cb5ec",
        },

        legend: {
          show: false,
          position: "right",
          lineHeight: 25,
        },
        extra: {
          ring: {
            ringWidth: 20,
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 12,
            border: false,
            borderWidth: 3,
            borderColor: "#FFFFFF",
          },
        },
      },
      data: {
        series: [
          {
            data: pieData.value,
          },
        ],
      },
    };
    isChartShow.value = true;
  } else {
    isChartShow.value = false;
  }
});
</script>
<style lang="less" scoped>
.charts-box {
  width: 100%;
  display: flex;
  // flex-direction: column;
  align-items: center;
  padding-top: 24rpx;
  .chart {
    flex: 1;
    overflow: hidden;
    height: 310rpx;
  }
  .legend {
    display: flex;
    flex-direction: column;
    color: rgba(0, 29, 69, 0.9);
    font-size: 24rpx;
    font-weight: 400;
    width: 140rpx;
    > .item {
      display: flex;
      align-items: baseline;
      padding-bottom: 12rpx;

      .tip {
        display: inline-block;
        width: 14rpx;
        height: 14rpx;
        margin-right: 8rpx;
      }
      > view:nth-child(1) {
        padding-bottom: 8rpx;
        padding-top: 12rpx;
      }
    }
  }
}
</style>
