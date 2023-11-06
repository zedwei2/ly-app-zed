<template>
  <view class="my common-success-bg">
    <view class="top-info">
      <image class="touxiang" :src="imgBaseUrl + user.icon" />
      <view>
        <text class="name">{{ user.name }}</text>
        <text class="identity" v-for="role in roles">{{ role }}</text>
      </view>
    </view>
    <view class="content common-content-bg">
      <view
        v-for="(item, index) in usrDetail"
        :key="index"
        class="item"
        @click="item.key === 'setting' ? openSet() : null"
      >
        <view class="left">
          <image :src="item.icon" />
          <text>{{ item.name }}</text>
        </view>
        <view class="right">
          <text>{{ user[item.key] }}</text>
          <image src="@/static/right-arrow.png" />
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import noPNG from "@/static/my/No.png";
import phonePng from "@/static/my/phone.png";
import settingPng from "@/static/my/setting.png";
import userInfoStore from "@/store/user";
import { forward } from "@/utils/router";
import global from "@/utils/global";

const imgBaseUrl = global.urls.fileUrl;
const userStore = userInfoStore();

const uniStore = JSON.parse(uni.getStorageSync("userInfo"));
const user = userStore.user;
const roles = ref([]);
roles.value = user.roles.map((item: any) => item.name);

const usrDetail = [
  { key: "id", name: "工号", icon: noPNG },
  {
    key: "phone",
    name: "手机号码",
    icon: phonePng,
  },
  {
    key: "setting",
    name: "设置",
    icon: settingPng,
  },
];
const openSet = () => {
  forward("set-up");
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
        color: #bbbec2;
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
