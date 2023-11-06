<script setup lang="ts">
import { onShow, onHide, onReady, onLoad, onLaunch } from "@dcloudio/uni-app";
import userInfoStore from "./store/user";

onReady(() => {
  console.log("App onReady");
});
onLaunch(() => {
  console.log("App onLaunch");
  const useStore = userInfoStore();
  const logged = useStore.logged;
  const uniStore = JSON.parse(uni.getStorageSync("userInfo"));
  //在app里拿不到piana的数据，取uniapp的缓存
  if (!logged && uniStore?.token) {
    useStore.setUserInfo({ token: uniStore.token, user: uniStore.user });
  }
  if (logged || uniStore.token) {
    //存在则关闭启动页进入首页
    plus.navigator.closeSplashscreen();
  } else {
    //不存在则跳转至登录页
    uni.reLaunch({
      url: "/pages/login/index",
      success: () => {
        plus.navigator.closeSplashscreen();
      },
    });
  }
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="less">
uni-page-body,
html,
body {
  height: 100%;
  overflow-y: hidden;
}
//tab样式
.uni-tabbar {
  margin: 10px 16px;
  border-radius: 55px;
  box-shadow: 0px 1px 4px 3px rgba(0, 0, 0, 0.05);
  // 上边框
  .uni-tabbar-border {
    display: none;
  }

  .uni-tabbar__item {
    padding: 9px 0;
  }
}
</style>
