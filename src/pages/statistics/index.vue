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
            <!-- <uDataSelect v-model="value" :localdata="range" @change="change">
            </uDataSelect> -->
          </view>
        </view>

        <view class="trend chart">
          <patientTrend :areaData="trendData" />
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
import { defineAsyncComponent, reactive, ref } from "vue";
import patientDistribution from "./components/patient-distribution.vue";
import patientTrend from "./components/patient-trend.vue";
import reasonAnalysis from "./components/reason-analysis.vue";

const uDataSelect = defineAsyncComponent(
  () =>
    import(
      "@/uni-data-select_1.0.6 (1)/components/uni-data-select/uni-data-select.vue"
    )
);

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

const value = ref(0);

const range = [
  { value: 0, text: "半年" },
  { value: 1, text: "一年" },
];

const dateRange = ref("半年"),
  currentDateIndex = ref(0),
  isSelectShow = ref(false);

function selectDate(item: any) {
  dateRange.value = item.text;
  currentDateIndex.value = item.value;
  isSelectShow.value = false;
}

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
        width: 100rpx;
        .select-content {
          position: absolute;
          top: 40rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          border: solid rgb(234, 221, 221) 1px;
          border-radius: 8rpx;

          text {
            // border-bottom: solid 1px #d6caca;
            padding: 4rpx 16rpx;
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
