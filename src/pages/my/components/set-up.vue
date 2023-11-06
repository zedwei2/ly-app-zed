<template>
  <view class="content">
    <view
      v-for="(item, index) in usrDetail"
      :key="index"
      class="item"
      @click="handleItemClick(item.key)"
    >
      <view class="left">
        <text>{{ item.name }}</text>
      </view>
      <view class="right">
        <image src="@/static/right-arrow.png" />
      </view>
    </view>
  </view>
  <van-button @click="logout" class="setting">退出登录</van-button>
</template>

<script lang="ts" setup>
import { forward } from "@/utils/router";
import { toLogin } from "@/utils/router";
import userInfoStore from "@/store/user";
import userService from "@/services/user.service";

const usrDetail = [
  {
    key: "agreement",
    name: "关于我们",
  },
  {
    key: "userAgreement",
    name: "用户协议",
  },
];

//打开 关于我们 页面
const agreement = () => {
  forward("about-us");
};

//打开 用户协议 页面
const userAgreement = () => {
  forward("user-agreement");
};
const handleItemClick = (key) => {
  if (key === "agreement") {
    agreement();
  } else if (key === "userAgreement") {
    userAgreement();
  }
};
//点击 退出到登录页
const logout = () => {
  userService.logout();
};
</script>

<style scoped lang="less">
.content {
  flex: 1;
  padding: 0 36rpx;
  background: #f9f9f9;
  margin-top: 20rpx;
  > view {
    display: flex;
    justify-content: space-between;
  }
  .item {
    display: flex;
    align-items: center;
    padding: 40rpx 0;
    .left {
      display: flex;
      align-items: center;
      image {
        width: 40rpx;
        height: 96rpx;
      }
      > text {
        color: var(--G2, #3a3a3f);
        font-size: 14px;
        font-weight: 400;
        line-height: 44rpx;
        letter-spacing: 0.2rpx;
      }
    }
    .right {
      font-weight: 400;
      font-size: 30rpx;
      > image {
        margin-left: 20rpx;
        width: 12rpx;
        height: 22rpx;
      }
    }
  }
}
.setting {
  position: fixed;
  bottom: 24rpx;
  left: 30rpx;
  right: 30rpx;
  background: #ff5d63;
  border-radius: 20rpx;
  text-align: center;
  font-weight: 400;
  font-size: 30rpx;
  color: #fff;
}
</style>
