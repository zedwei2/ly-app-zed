<template>
  <view class="common-success-bg">
    <custom-navbar title="统计"></custom-navbar>
    <view class="statictis" :style="'height: calc(100vh - ' + 140 + 'rpx);'">
      <topStatic />
      <view class="chart-content">
        <view class="container">
          <text class="title">数据统计分析</text>
          <view>
            <customSelect
              :selectedItem="alertType"
              :selectRange="AlertTypeRange"
              @on-select-change="onAlertTypeChange"
            />
            <customSelect
              :selectedItem="currentTime"
              :selectRange="DateRange"
              @on-select-change="onDateChange"
            />
          </view>
        </view>
        <view class="chart">
          <staticData :alert-type="alertType" :date-type="currentTime" />
        </view>
      </view>
      <view class="chart-content">
        <view class="container">
          <text class="title">预警趋势分析</text>
          <view>
            <customSelect
              :selectedItem="currentTrendTime"
              :selectRange="DateRange"
              @on-select-change="onTrendDateChange"
            />
          </view>
        </view>
        <warningTrend :date-type="currentTrendTime" />
      </view>
      <view class="chart-content">
        <text class="title">因素分析</text>
        <view class="reason-analysis chart">
          <reasonAnalysis :reasonData="reasonData" />
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { reactive, ref, computed } from "vue";
import { onShow, onHide, onReady } from "@dcloudio/uni-app";

import { DateRange, AlertTypeRange } from "./mapping";
import topStatic from "./components/top-static.vue/index.vue";
import customSelect from "./components/charts/select/index.vue";
import staticData from "./components/charts/static-data/index.vue";
import reasonAnalysis from "./components/charts/reason-analysis/index.vue";
import warningTrend from "./components/charts/warning-trend/index.vue";

/**因素分析数据 */
const reasonData = reactive([
    { name: "心率异常", centerText: "50", value: 50 },
    { name: "血糖异常", centerText: "30", value: 30, labelShow: false },
    { name: "血压异常", centerText: "20", value: 20, labelShow: false },
    { name: "血氧饱和度", centerText: "18", value: 18, labelText: "四班:18人" },
    { name: "呼吸频率", centerText: "8", value: 8, labelShow: false },
  ]),
  currentTime = ref("DAY"),
  currentTrendTime = ref("DAY"),
  alertType = ref("HeartRate");

/**数据统计预警类型选择*/
const onAlertTypeChange = (type: string) => {
  alertType.value = type;
};
/**数据统计时间选择 */
const onDateChange = (date: string) => {
  currentTime.value = date;
};

/**预警趋势时间选择 */
const onTrendDateChange = (date: string) => {
  currentTrendTime.value = date;
};

/**
 * 获取患者分布数据
 *
 */
const getDistributionData = async () => {};

onShow(() => {
  getDistributionData();
});
</script>

<style scoped lang="less">
.statictis {
  overflow-y: auto;
  padding: 10px 16px;
  position: sticky;
  top: 160rpx;
  z-index: 1;

  .chart-content {
    background: #fff;
    border-radius: 8rpx;
    padding: 24rpx;
    margin-top: 20rpx;
    box-shadow: 0 0 5px 1px rgba(153, 153, 153, 0.2);
    .title {
      color: #242429;
      font-size: 30rpx;
      font-weight: 600;
      line-height: 52rpx;
    }
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > view {
        display: flex;
        justify-content: flex-end;
        flex: 1;
        > view {
          padding-left: 16rpx;
        }
      }
    }

    .trend {
      height: 288rpx;
    }
  }
}
</style>
