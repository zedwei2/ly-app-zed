<template>
  <view class="login common-page common-success-bg">
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
        <text>{{ userToAgree.userAgreement }}</text
        >和
        <text>{{ userToAgree.privacy }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";

export default defineComponent({
  name: "",
  components: {},
  props: {
    classType: {
      type: String,
      default: "success",
    },
  },
  setup() {
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
      uni.switchTab({
        url: "/pages/patient-list/index",
      });
    };
    return {
      userToAgree,
      isChecked,
      login,
    };
  },
});
</script>

<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;
  .left-icon {
    position: fixed;
    left: 0;
    width: 175px;
    height: 77px;
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
        left: 23px;
        bottom: 30px;
        color: #fff;
        font-size: 26px;
      }
    }

    > image {
      padding-top: 48px;
      width: 141px;
      height: 112px;
    }
  }
  .content {
    flex: 1;
    background: #fff;
    border-radius: 24px 24px 0 0;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    justify-content: center;

    font-size: 16px;
    > form {
      width: 100%;
      padding: 32px;
      .title {
        font-size: 17px;
        font-weight: 700;
        padding-bottom: 12px;
      }
      .uni-form-item {
        border-bottom: solid 1px #eef0f1;
        padding: 12px 0;
        font-size: 16px;
        font-weight: 300;
      }
      button {
        margin-top: 24px;
        background: linear-gradient(91deg, #45dde1 2.47%, #09ccd5 99.67%);
      }
    }
    .usr-agreement {
      font-size: 14px;
      padding: 12px 37px;
      display: flex;
      align-items: center;
      color: #92969a;
      font-size: 14px;
      .checked {
        height: 16px;
        width: 16px;
        padding-right: 3px;
      }
      text {
        color: #00bdc6;
      }
    }
  }
}
</style>
