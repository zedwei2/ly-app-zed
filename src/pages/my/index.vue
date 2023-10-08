<template>
  <view class="my common-page common-success-bg">
    <view class="top-info">
      <image class="touxiang" src="~@/assets/patient-list/touxiang.png" />
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
          <image src="~@/assets/right-arrow.png" />
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

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";

import { common } from "@/core/utils/common";

export default defineComponent({
  name: "",
  setup() {
    const userInfo = {
      name: "王桃花",
      identity: "门诊部医师",
      No: "007",
      phone: "17356841563",
    };

    const usrDetail = [
      { key: "No", name: "工号", icon: require("@/assets/my/No.png") },
      {
        key: "phone",
        name: "手机号码",
        icon: require("@/assets/my/phone.png"),
      },
    ];

    const logout = () => {
      uni.removeStorageSync("userInfo");
      common.toLogin();
    };

    return {
      userInfo,
      usrDetail,
      logout,
    };
  },
});
</script>

<style scoped lang="less">
.my {
  display: flex;
  flex-direction: column;
  .top-info {
    display: flex;
    padding: 50px 24px 16px;
    align-items: center;
    color: #fff;
    > image {
      border-radius: 64px;
      border: 2px solid #fff;
      width: 64px;
      height: 64px;
    }
    > view {
      display: flex;
      flex-direction: column;
      padding-left: 12px;
      font-weight: 500;
      .name {
        font-size: 22px;
      }
      .identity {
        font-size: 14px;
      }
    }
  }
  .content {
    flex: 1;
    padding: 0 18px;
    > view {
      display: flex;
      justify-content: space-between;
    }
    .item {
      padding: 23px 0;
      display: flex;
      align-items: center;
      border-bottom: solid 1px #f2f2f2;
      .left {
        display: flex;
        align-items: center;
        image {
          width: 20px;
          height: 20px;
        }
        > text {
          padding-left: 19px;
        }
      }
      .right {
        color: #92969a;
        font-size: 15px;
        font-weight: 400;
        > image {
          height: 11px;
          width: 6px;
          margin-left: 10px;
        }
      }
    }
    .more {
      margin-top: 12px;
      justify-content: space-around;
      > view {
        width: 18px;
      }
      > button {
        width: 100%;
        color: #92969a;
        text-align: center;
        font-size: 15px;
        font-weight: 400;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 10px;
        border: 1px solid #92969a;
      }
    }
  }
}
</style>
