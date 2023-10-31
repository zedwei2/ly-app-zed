<template>
  <view class="common-success-bg">
    <custom-navbar title="统计"></custom-navbar>
    <view class="statictis" :style="'height: calc(100vh - ' + 140 + 'rpx);'">
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
            <patientDistribution :pieData="hbpData" />
          </view>
          <view>
            <patientDistribution :pieData="lbpData" />
          </view>
          <view>
            <patientDistribution :pieData="hhrData" />
          </view>
          <view>
            <patientDistribution :pieData="lhrData" />
          </view>
        </view>
      </view>
      <view class="chart-content trend">
        <view class="container">
          <text class="title">患者趋势</text>
          <view class="custom-select">
            <view @click="isSelectShow = !isSelectShow">
              <text>{{ dateRange }}</text>
              <van-icon name="arrow-down" v-if="isSelectShow" />
              <van-icon name="arrow-up" v-else />
            </view>

            <view class="select-content" v-if="isSelectShow">
              <text
                v-for="(item, index) in range"
                :key="index"
                @click="selectDate(item)"
                >{{ item.text }}</text
              >
            </view>
          </view>
        </view>

        <view class="trend chart">
          <patientTrend :dateRange="dateRange" />
        </view>
        <text class="title">因素分析</text>
        <view class="reason-analysis chart">
          <reasonAnalysis :reasonData="reasonData" />
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { onShow, onHide, onReady } from "@dcloudio/uni-app";

import apiTest from "@/api/apiTest";

import patientDistribution from "./components/patient-distribution.vue";
import patientTrend from "./components/patient-trend.vue";
import reasonAnalysis from "./components/reason-analysis.vue";

/**统计数据 */
const staticInfo = {
    totalNo: 12,
    warningNo: 2,
  },
  /**高血压数据 */
  hbpData = reactive({
    color: "#00BDC6",
    rate: 0.24,
    name: "高血压",
    total: 12,
    countHealth: 2,
  }),
  /**低血压数据 */
  lbpData = reactive({
    color: "#FF9F18",
    rate: 0.08,
    name: "低血压",
    total: 12,
    countHealth: 2,
  }),
  /***心率高数据 */
  hhrData = reactive({
    color: "#FF5D63",
    rate: 0.34,
    name: "心率高",
    total: 12,
    countHealth: 2,
  }),
  /**心率低数据 */
  lhrData = reactive({
    color: "#AE73FF",
    rate: 0.44,
    name: "心率低",
    total: 12,
    countHealth: 2,
  }),
  /**因素分析数据 */
  reasonData = reactive([
    { name: "心率异常", centerText: "50", value: 50 },
    { name: "血糖异常", centerText: "30", value: 30, labelShow: false },
    { name: "血压异常", centerText: "20", value: 20, labelShow: false },
    { name: "血氧饱和度", centerText: "18", value: 18, labelText: "四班:18人" },
    { name: "其他", centerText: "8", value: 8, labelShow: false },
  ]),
  /**时间范围选择 */
  range = [
    { value: 0, text: "半年" },
    { value: 1, text: "一年" },
  ],
  dateRange = ref("半年"),
  currentDateIndex = ref(0),
  isSelectShow = ref(false);

/**
 * 下拉选择时间
 * @param item 选择的时间
 */
const selectDate = (item: any) => {
  dateRange.value = item.text;
  currentDateIndex.value = item.value;
  isSelectShow.value = false;
};

/**
 * 获取患者分布数据
 *
 */
const getDistributionData = async () => {
  const postTest = await apiTest.getTest({ a: 1 });
  if (!postTest) return;
  console.log("postTest=====", postTest);
};

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

  .basic-info {
    display: flex;
    justify-content: space-around;

    > view:not(:last-child) {
      margin-right: 20rpx;
    }

    > view {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 24rpx 28rpx;
      background: #fff;
      border-radius: 8rpx;
      width: 100%;

      .title {
        color: #4c5056;
        font-size: 24rpx;
        font-weight: 500;
      }

      .title1 {
        &::before {
          content: "";
          width: 8rpx;
          height: 20rpx;
          display: inline-block;
          position: relative;
          top: 0;
          background: #007bff;
          margin-right: 12rpx;
          border-radius: 4rpx;
        }
      }

      .title2 {
        &::before {
          content: "";
          width: 8rpx;
          height: 20rpx;
          display: inline-block;
          position: relative;
          top: 0px;
          background: #ff4141;
          margin-right: 12rpx;
          border-radius: 4rpx;
        }
      }

      .number {
        color: rgba(0, 29, 69, 0.9);
        font-size: 44rpx;
        font-weight: 700;
        line-height: 44rpx;
        padding-top: 18rpx;
        padding-left: 18rpx;
      }
    }
  }

  .chart-content {
    background: #fff;
    border-radius: 8rpx;
    padding: 24rpx;
    margin-top: 20rpx;
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .custom-select {
        position: relative;
        color: #4c5056;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 22px; /* 157.143% */
        .select-content {
          z-index: 99;
          position: absolute;
          top: 45rpx;
          left: -30rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #fff;
          box-shadow: 0px 1px 4px 3px rgba(0, 0, 0, 0.1);
          border-radius: 8rpx;

          text {
            text-align: center;
            width: 140rpx;
            padding: 6rpx 10rpx;
            z-index: 999;
          }
        }
      }
    }

    .title {
      color: #242429;
      font-size: 32rpx;
      font-weight: 500;
      line-height: 52rpx;
      /* 162.5% */
    }

    .pie-chart {
      display: flex;
      flex-wrap: wrap;
      /* 允许子元素换行 */
      justify-content: space-between;

      /* 水平方向均匀分布 */
      > view {
        flex-basis: calc(50% - 10px);
        /* 子元素宽度占50%（减去间距） */
        margin-bottom: 40rpx;
        /* 垂直方向的间距 */
        box-sizing: border-box;
        /* 防止元素超出容器 */
        width: 50%;
      }
    }

    .trend {
      height: 288rpx;
    }

    .reason-analysis {
      width: 100%;
    }

    > view {
      margin-bottom: 30rpx;
    }
  }
}
</style>
