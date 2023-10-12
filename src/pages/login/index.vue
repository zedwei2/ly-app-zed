<template>
  <view class="login common-success-bg">
    <image
      class="left-icon"
      src="@/static/login/login-left-icon.png"
      mode="scaleToFill"
    />
    <view class="top-title">
      <view class="title">
        <text>心梗预警移动平台</text>
      </view>
      <image src="@/static/login/login-watch.png" mode="scaleToFill" />
    </view>
    <view class="content">
      <form>
        <view class="uni-form-item uni-column">
          <view class="title">账号</view>
          <input class="uni-input" name="input" placeholder="请输入您的账号" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">密码</view>
          <input class="uni-input" name="input" placeholder="请输入您的密码" />
        </view>
        <button type="primary" @click="login" :disabled="!isChecked">
          立即登录
        </button>
      </form>

      <view class="usr-agreement">
        <image
          class="checked"
          src="@/static/login/check-agree.png"
          mode="scaleToFill"
        />
        阅读并同意
        <text @click="service">{{ userToAgree.userAgreement }}</text
        >和
        <text @click="serviceClick">{{ userToAgree.privacy }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { forward } from "@/utils/router";
import { ref } from "vue";

const userToAgree = {
  userAgreement: `《用户服务协议》`,
  privacy: `《隐私政策》`,
};
const isChecked = ref<boolean>(true);

const login = () => {
  let userInfo = {
    userId: "1",
    token: "xxx",
  };
  uni.setStorageSync("userInfo", JSON.stringify(userInfo));
  // forward("patient");
  uni.switchTab({
    url: "/pages/patient-list/index",
  });
};

// 打开用户协议页面
const service = () => {
  forward("user-agreement");
  // uni.navigateTo({
  //   url: "/pages/login/components/user-agreement",
  // });
};

// 打开隐私政策页面
const serviceClick = () => {
  forward("privacy-policy");
  // uni.navigateTo({
  //   url: "/pages/login/components/privacy-policy",
  // });
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;

  .left-icon {
    position: fixed;
    left: 0;
    width: 350rpx;
    height: 154rpx;
  }

  .top-title {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    position: relative;

    .title {
      flex: 1;
      position: relative;

      > text {
        position: absolute;
        left: 46rpx;
        bottom: 60rpx;
        color: #fff;
        font-size: 52rpx;
      }
    }

    > image {
      padding-top: 96rpx;
      width: 282rpx;
      height: 224rpx;
    }
  }

  .content {
    flex: 1;
    background: #fff;
    border-radius: 48rpx 48rpx 0 0;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    justify-content: center;

    font-size: 32rpx;

    > form {
      width: 100%;
      padding: 64rpx;

      .title {
        font-size: 34rpx;
        font-weight: 700;
        padding-bottom: 24rpx;
      }

      .uni-form-item {
        border-bottom: solid 2rpx #eef0f1;
        padding: 24rpx 0;
        font-size: 32rpx;
        font-weight: 300;
      }

      button {
        margin-top: 48rpx;
        background: linear-gradient(91deg, #45dde1 2.47%, #09ccd5 99.67%);
      }
    }

    .usr-agreement {
      font-size: 24rpx;
      padding: 24rpx 74rpx;
      display: flex;
      align-items: center;
      color: #92969a;
      font-size: 28rpx;

      .checked {
        height: 32rpx;
        width: 32rpx;
        padding-right: 6rpx;
      }

      text {
        color: #00bdc6;
      }
    }
  }
}
</style>
