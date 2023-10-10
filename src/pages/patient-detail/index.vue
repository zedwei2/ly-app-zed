<template>
  <view
    class="patient-detail-wrapper"
    :class="isWarining ? 'common-warning-bg' : 'common-success-bg'"
  >
    <view class="patient-detail-title">{{
      `${isWarining ? "异常预警" : "健康"}`
    }}</view>
    <view class="patient-detail-card">
      <image src="@/static/patient-list/touxiang.png" mode="scaleToFill" />
      <view class="desc">
        <view class="desc-name">李客勤</view>
        <view class="desc-sex"
          ><text>男</text><text class="icon">|</text><text>27岁</text></view
        >
      </view>
      <FocusCall :is-focus="false" :phone="'123456'" />
    </view>
    <view class="patient-detail-content">
      <view class="detail-content-medical">
        <text>患者医疗数据</text>
        <view class="content-medical">
          <view
            class="medical-item"
            v-for="item in medicalData"
            :key="item.text"
          >
            <image :src="item.icon" mode="aspectFit" />
            <view class="text">{{ item.text }}</view>
          </view>
        </view>
      </view>
      <view class="detail-content-time">
        <view class="content-time-title">
          <text class="title">实时数据</text>
          <text class="view">查看趋势</text>
          <image
            src="@/static/patient-detail/title-arrow.png"
            mode="aspectFit"
          />
        </view>
        <view class="content-time-body">
          <view
            class="time-body-item"
            v-for="item in realTimeData"
            :key="item.text"
            @click="toDetail(item)"
          >
            <image :src="item.icon" mode="aspectFit" />
            <view class="desc">
              <view class="desc-text">{{ item.text }}</view>
              <view class="desc-time">{{ item.time }}</view>
            </view>
            <view class="value">{{ item.value }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FocusCall from "@/components/focus-call/index.vue";
import treasure from "@/static/patient-detail/treasure.png";
import reserve from "@/static/patient-detail/reserve.png";
import early from "@/static/patient-detail/early.png";
import heartRate from "@/static/patient-detail/heart-rate.png";
import bloodPressure from "@/static/patient-detail/blood-pressure.png";
import bloodOxygen from "@/static/patient-detail/blood-oxygen.png";
import bloodSugar from "@/static/patient-detail/blood-sugar.png";
import { forward } from "@/utils/router";

const isWarining = ref<boolean>(false);

// 患者医疗数据
const medicalData = [
  {
    icon: early,
    text: "预警记录",
  },
  {
    icon: reserve,
    text: "预留功能",
  },
  {
    icon: treasure,
    text: "预留功能",
  },
];

// 实时数据
const realTimeData = [
  {
    icon: heartRate,
    text: "心率",
    time: "16:15",
    value: "95",
    key: "hr",
  },
  {
    icon: bloodPressure,
    text: "血压",
    time: "16:15",
    value: "136/78",
    key: "bp",
  },
  {
    icon: bloodOxygen,
    text: "血氧",
    time: "16:15",
    value: "98",
    key: "bo",
  },
  {
    icon: bloodSugar,
    text: "血糖",
    time: "16:15",
    value: "6",
  },
];

const toDetail = (item: any) => {
  if (item.key) {
    forward(`${item.key}-detail`);
  }
};
</script>

<style lang="scss">
.patient-detail-wrapper {
  padding: 0 32rpx;
  .patient-detail-title {
    text-align: center;
    width: 100%;
    padding: 60rpx 0;
    color: #fff;
    font-size: 80rpx;
    font-weight: 700;
    line-height: 68rpx;
  }
  .patient-detail-card {
    height: 120rpx;
    border-radius: 24rpx;
    padding: 32rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.8);
    > image {
      width: 164rpx;
      height: 160rpx;
    }
    .desc-sex {
      display: flex;
      align-items: center;
      color: #92969a;
      font-size: 28rpx;
      .icon {
        margin: 0 8rpx;
      }
    }
  }
}
.patient-detail-content {
  padding: 0 8rpx;
  .detail-content-medical {
    margin-top: 60rpx;
    > text {
      color: #242429;
      font-size: 32rpx;
      font-weight: 500;
      line-height: 52rpx;
    }
    .content-medical {
      display: flex;
      justify-content: space-between;
      margin-top: 48rpx;
      .medical-item {
        text-align: center;
        image {
          width: 88rpx;
          height: 88rpx;
          margin-bottom: 12rpx;
        }
        .text {
          color: #92969a;
          font-size: 28rpx;
          line-height: 28rpx;
        }
      }
    }
  }
  .detail-content-time {
    margin-top: 100rpx;
    .content-time-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 48rpx;
      .title {
        color: #242429;
        font-size: 32rpx;
        font-weight: 500;
        line-height: 52rpx;
        flex: 1;
      }
      image {
        margin-top: 4rpx;
        width: 28rpx;
        height: 28rpx;
      }
      .view {
        color: #007bff;
        font-size: 28rpx;
        line-height: 44rpx;
      }
    }
    .content-time-body {
      display: flex;
      flex-wrap: wrap;
      .time-body-item {
        text-align: center;
        display: flex;
        justify-content: space-between;
        margin-bottom: 52rpx;
        width: 290rpx;
        &:nth-child(odd) {
          margin-right: auto;
        }
        image {
          width: 88rpx;
          height: 88rpx;
          margin-bottom: 12rpx;
        }
        .desc {
          color: #92969a;
          font-size: 28rpx;
          line-height: 28rpx;
          flex: 1;
          text-align: left;
          margin: 12rpx 0 12rpx 18rpx;
          .desc-text {
            color: #4c5056;
            font-size: 30rpx;
            line-height: 32rpx;
            margin-bottom: 4rpx;
          }
          .desc-time {
            color: #a3a8ad;
            font-size: 20rpx;
            line-height: 24rpx;
          }
        }
        .value {
          margin: 12rpx 0;
          color: #4c5056;
          font-size: 32rpx;
          font-weight: 700;
          line-height: 32rpx;
        }
      }
    }
  }
}
</style>
