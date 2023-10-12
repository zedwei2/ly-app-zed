<template>
  <view class="my common-success-bg">
    <view class="top-info">
      <image class="touxiang" src="@/static/patient-list/touxiang.png" />
      <view>
        <text class="name">{{ userInfo.name }}</text>
        <text class="identity">{{ userInfo.identity }}</text>
      </view>
    </view>
    <view class="content common-content-bg">
      <view v-for="(item, index) in usrDetail" :key="index" class="item">
        <view class="left">
          <image :src="item.icon" />
          <text>{{ item.name }}</text>
        </view>
        <view class="right">
          <text>{{ userInfo[item.key] }}</text>
          <image src="@/static/right-arrow.png" />
        </view>
      </view>

      <view class="more">
        <van-button @click="logout">退出登录（临时）</van-button>
        <van-button>拓展功能2</van-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { toLogin } from "@/utils/router";
import noPNG from "@/static/my/No.png";
import phonePng from "@/static/my/phone.png";

const userInfo = {
  name: "王桃花",
  identity: "门诊部医师",
  No: "007",
  phone: "17356841563",
};

const usrDetail = [
  { key: "No", name: "工号", icon: noPNG },
  {
    key: "phone",
    name: "手机号码",
    icon: phonePng,
  },
];

const logout = () => {
  uni.removeStorageSync("userInfo");
  toLogin();
};
</script>

<style scoped lang="scss">
.my {
  display: flex;
  flex-direction: column;
  height: 100%;
  .top-info {
    display: flex;
    align-items: center;
    padding: 100rpx 48rpx 32rpx;
    color: #fff;
    > image {
      border: 4rpx solid #fff;
      border-radius: 128rpx;
      width: 128rpx;
      height: 128rpx;
    }
    > view {
      display: flex;
      flex-direction: column;
      padding-left: 24rpx;
      font-weight: 500;
      .name {
        font-size: 44rpx;
      }
      .identity {
        font-size: 28rpx;
      }
    }
  }
  .content {
    flex: 1;
    padding: 0 36rpx;
    > view {
      display: flex;
      justify-content: space-between;
    }
    .item {
      display: flex;
      align-items: center;
      padding: 46rpx 0;
      border-bottom: solid 2rpx #f2f2f2;
      .left {
        display: flex;
        align-items: center;
        image {
          width: 40rpx;
          height: 40rpx;
        }
        > text {
          padding-left: 38rpx;
        }
      }
      .right {
        font-weight: 400;
        font-size: 30rpx;
        color: #92969a;
        > image {
          margin-left: 20rpx;
          width: 12rpx;
          height: 22rpx;
        }
      }
    }
    .more {
      justify-content: space-around;
      margin-top: 24rpx;

      .van-button:not(:last-child) {
        margin-right: 36rpx;
      }
      > .van-button {
        padding-top: 20rpx;
        padding-bottom: 20rpx;
        border: 2rpx solid #92969a;
        border-radius: 20rpx;
        width: 100%;
        text-align: center;
        font-weight: 400;
        font-size: 30rpx;
        color: #92969a;
      }
    }
  }
}
</style>
