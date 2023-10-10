import { toLogin } from "./router";
const whiteList = [
  "/pages/login/index",
  "/pages/login/components/user-agreement",
  "/pages/login/components/privacy-policy",
];
const list = ["navigateTo", "reLaunch", "switchTab"];

function hasPermission(url: string) {
  const usrObj = uni.getStorageSync("userInfo");
  // 在白名单中或有token，直接跳转
  if (whiteList.indexOf(url) !== -1 || (usrObj && JSON.parse(usrObj).token)) {
    return true;
  }
  return false;
}

list.forEach((item) => {
  uni.addInterceptor(item, {
    // 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转

    invoke(e) {
      console.log("e========", e, hasPermission(e.url));
      if (!hasPermission(e.url)) {
        // 将用户的目标路径保存下来
        // 这样可以实现 用户登录之后，直接跳转到目标页面
        uni.setStorageSync("URL", e.url);
        toLogin();

        return false;
      }
      return true;
    },
  });
});
