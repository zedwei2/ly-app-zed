<script setup lang="ts">
import FocusCall from '@/components/FocusCall.vue'
</script>

<template>
  <view class="patient-detail-wrapper">
    <view class="patient-detail-title">{{ '健康' }}</view>
    <view class="patient-detail-card">
      <image
        src="@/static/patient-list/touxiang.png"
        mode="scaleToFill"
      />
      <view class="desc">
        <view class="desc-name">李客勤</view>
        <view class="desc-sex"><text>男</text><text class="icon">|</text><text>27岁</text></view>
      </view>
      <FocusCall :is-focus="false" :phone="'123456'" />
    </view>
  </view>
</template>

<style lang="scss">
  .patient-detail-wrapper {
    background: blue;
    padding: 30rpx 32rpx;
    .patient-detail-title {
      text-align: center;
      width: 100%;
      padding: 60rpx 0;
      color: #FFF;
      font-size: 80rpx;
      font-weight: 700;
      line-height: 68rpx; /* 85% */
    }
    .patient-detail-card {
      height: 120rpx;
      background: #EDFAFB;
      border-radius: 24rpx;
      padding: 32rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      // fill: linear-gradient(2deg, rgba(255, 255, 255, 0.86) 3.76%, rgba(255, 255, 255, 0.86) 81.42%, rgba(255, 255, 255, 0.84) 98.97%);
      // box-shadow: -4rpx -4rpx 0rpx 0rpx rgba(255, 255, 255, 0.60) inset, 2rpx 2rpx 0rpx 0rpx rgba(255, 255, 255, 0.60) inset;
      // filter: drop-shadow(0rpx 12rpx 30rpx rgba(21, 73, 99, 0.13));
      // backdrop-filter: blur(80rpx);
      > image {
        width: 164rpx;
        height: 160rpx;
      }
      .desc {
        flex: 1;
        margin-left: 28rpx;
        .desc-name {
          color: #242429;
          font-size: 40rpx;
          font-weight: 500;
          margin-bottom: 8rpx;
        }
        .desc-sex {
          display: flex;
          align-items: center;
          color: #92969A;
          font-size: 28rpx;
          .icon {
            margin: 0 8rpx;
          }
        }
      }
    }
  }
</style>
