<template>
  <view class="common-success-bg">
    <custom-navbar title="统计"></custom-navbar>
    <view class="statictis" :style="'height: calc(100vh - ' + 80 + 'px);'">
      <view class="basic-info">
        <view>
          <text class="title title1">全部患者/人</text>
          <text class="warn number">{{ staticInfo.totalNo }}</text>
        </view>
        <view>
          <text class="title title2">预警患者/人</text>
          <text class="number">{{ staticInfo.warningNo }}</text>
        </view>
      </view>
      <view class="chart-content patient-distribution">
        <text class="title">患者分布</text>
        <view class="pie-chart">
          <view>
            <pieChart :pieData="hbpData" />
          </view>
          <view>
            <pieChart :pieData="lbpData" />
          </view>
          <view>
            <pieChart :pieData="hhrData" />
          </view>
          <view>
            <pieChart :pieData="lhrData" />
          </view>
        </view>
      </view>
      <view class="chart-content trend">
        <view>
          <text class="title">患者趋势</text>
        </view>
        <view class="trend chart">
          <areaChart :areaData="trendData" />
        </view>
        <text class="title">因素分析</text>
        <view class="reason-analysis chart">
          <funnelChart :reasonData="reasonData" />
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import pieChart from "@/components/u-charts/pie/index.vue";
import funnelChart from "@/components/u-charts/funnel/index.vue";
import areaChart from "@/components/u-charts/area/index.vue";

const staticInfo = {
  totalNo: 12,
  warningNo: 2,
};

/**高血压数据 */
const hbpData = reactive({
  color: "#00BDC6",
  rate: 0.24,
  name: "高血压",
  total: 12,
  countHealth: 2,
});
/**低血压数据 */
const lbpData = reactive({
  color: "#FF9F18",
  rate: 0.08,
  name: "低血压",
  total: 12,
  countHealth: 2,
});
/***心率高数据 */
const hhrData = reactive({
  color: "#FF5D63",
  rate: 0.34,
  name: "心率高",
  total: 12,
  countHealth: 2,
});
/**心率低数据 */
const lhrData = reactive({
  color: "#AE73FF",
  rate: 0.44,
  name: "心率低",
  total: 12,
  countHealth: 2,
});

/**患者趋势数据 */
const trendData = reactive({
  categories: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"],
  series: [
    {
      data: [35, 38, 35, 37, 24, 30, 28, 25, 37],
    },
  ],
});
/**因素分析数据 */
const reasonData = reactive([
  { name: "心率异常", centerText: "50", value: 50 },
  { name: "血糖异常", centerText: "30", value: 30, labelShow: false },
  { name: "血压异常", centerText: "20", value: 20, labelShow: false },
  { name: "血氧饱和度", centerText: "18", value: 18, labelText: "四班:18人" },
  { name: "其他", centerText: "8", value: 8, labelShow: false },
]);
</script>

<style scoped lang="less">
.statictis {
  overflow-y: auto;
  padding: 10px 16px;
  .basic-info {
    display: flex;
    justify-content: space-around;
    > view:not(:last-child) {
      margin-right: 10px;
    }
    > view {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 12px 14px;
      background: #fff;
      border-radius: 4px;
      width: 100%;

      .title {
        color: #4c5056;
        font-size: 12px;
        font-weight: 500;
      }
      .title1 {
        &::before {
          content: "";
          width: 4px;
          height: 10px;
          display: inline-block;
          position: relative;
          top: 0px;
          background: #007bff;
          margin-right: 6px;
          border-radius: 2px;
        }
      }
      .title2 {
        &::before {
          content: "";
          width: 4px;
          height: 10px;
          display: inline-block;
          position: relative;
          top: 0px;
          background: #ff4141;
          margin-right: 6px;
          border-radius: 2px;
        }
      }
      .number {
        color: rgba(0, 29, 69, 0.9);
        font-size: 22px;
        font-weight: 700;
        line-height: 22px;
        padding-top: 9px;
        padding-left: 9px;
      }
    }
  }
  .chart-content {
    background: #fff;
    border-radius: 4px;
    padding: 12px;
    margin-top: 10px;
    .title {
      color: #242429;
      font-size: 16px;
      font-weight: 500;
      line-height: 26px; /* 162.5% */
    }
    .pie-chart {
      display: flex;
      flex-wrap: wrap; /* 允许子元素换行 */
      justify-content: space-between; /* 水平方向均匀分布 */
      > view {
        flex-basis: calc(50% - 10px); /* 子元素宽度占50%（减去间距） */
        margin-bottom: 20px; /* 垂直方向的间距 */
        box-sizing: border-box; /* 防止元素超出容器 */
        width: 50%;
      }
    }
    .trend {
      height: 144px;
    }
    .reason-analysis {
      width: 100%;
    }
    > view {
      margin-bottom: 15px;
    }
  }
}
</style>
