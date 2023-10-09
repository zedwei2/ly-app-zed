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
        <button @click="login" :disabled="!isChecked">
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
<script lang="ts" setup>
import {ref, reactive } from "vue";
const { userInfo,  token, userId, setUserInfo } = useStore('user');

const isChecked = ref<boolean>(true);

const userToAgree = reactive({
  userAgreement: `《用户服务协议》`,
  privacy: `《隐私政策》`,
});

const login = () => {
  let userInfo = {
    userId: "1",
    token: "xxx",
  };
  console.log('通过类似vuex[](pinia)保存用户数据，', userInfo,  token, userId, setUserInfo)
  // uni.setStorageSync("userInfo", JSON.stringify(userInfo));
  uni.switchTab({
    url: "/pages/patient-list/index",
  });
};

</script>

<style lang="scss" scoped>
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
    position: relative;
    justify-content: space-between;
    align-items: baseline;
    .title {
      position: relative;
      flex: 1;
      > text {
        position: absolute;
        left: 23px;
        bottom: 30px;
        font-size: 26px;
        color: #fff;
      }
    }
    > image {
      padding-top: 48px;
      width: 141px;
      height: 112px;
    }
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: space-between;
    flex: 1;
    border-radius: 24px 24px 0 0;
    background: #fff;
    font-size: 16px;
    > form {
      padding: 32px;
      width: 100%;
      .title {
        padding-bottom: 12px;
        font-weight: 700;
        font-size: 17px;
      }
      .uni-form-item {
        padding: 12px 0;
        border-bottom: solid 1px #eef0f1;
        font-weight: 300;
        font-size: 16px;
      }
      button {
        margin-top: 24px;
        background: linear-gradient(91deg, #45dde1 2.47%, #09ccd5 99.67%);
      }
    }
    .usr-agreement {
      display: flex;
      align-items: center;
      padding: 12px 37px;
      font-size: 14px;
      font-size: 14px;
      color: #92969a;
      .checked {
        padding-right: 3px;
        width: 16px;
        height: 16px;
      }
      text {
        color: #00bdc6;
      }
    }
  }
}
</style>
