<template>
  <view class="my common-page common-success-bg">
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
        <button @click="logout">退出登录（临时）</button>
        <view></view>
        <button>拓展功能2</button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { defineComponent, ref, reactive } from "vue";
import { common } from "@/utils/common";
import noPNG from '@/static/my/No.png'
import phonePng from '@/static/my/phone.png'

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
  common.toLogin();
};
</script>

<style scoped lang="scss">
.my {
  display: flex;
  flex-direction: column;
  .top-info {
    display: flex;
    align-items: center;
    padding: 50px 24px 16rpx;
    color: #fff;
    > image {
      border: 2px solid #fff;
      border-radius: 64rpx;
      width: 64rpx;
      height: 64rpx;
    }
    > view {
      display: flex;
      flex-direction: column;
      padding-left: 12rpx;
      font-weight: 500;
      .name {
        font-size: 22rpx;
      }
      .identity {
        font-size: 14rpx;
      }
    }
  }
  .content {
    flex: 1;
    padding: 0 18rpx;
    > view {
      display: flex;
      justify-content: space-between;
    }
    .item {
      display: flex;
      align-items: center;
      padding: 23px 0;
      border-bottom: solid 1px #f2f2f2;
      .left {
        display: flex;
        align-items: center;
        image {
          width: 20rpx;
          height: 20rpx;
        }
        > text {
          padding-left: 19rpx;
        }
      }
      .right {
        font-weight: 400;
        font-size: 15rpx;
        color: #92969a;
        > image {
          margin-left: 10rpx;
          width: 6rpx;
          height: 11rpx;
        }
      }
    }
    .more {
      justify-content: space-around;
      margin-top: 12rpx;
      > view {
        width: 18rpx;
      }
      > button {
        padding-top: 10rpx;
        padding-bottom: 10rpx;
        border: 1px solid #92969a;
        border-radius: 10rpx;
        width: 100%;
        text-align: center;
        font-weight: 400;
        font-size: 15rpx;
        color: #92969a;
      }
    }
  }
}
</style>
