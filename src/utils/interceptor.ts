import { toLogin } from "./router";
import userInfoStore from "@/store/user";

const whiteList = [
  "/pages/login/index",
  "/pages/login/components/user-agreement",
  "/pages/login/components/privacy-policy",
];
const list = ["navigateTo", "reLaunch", "switchTab"];

function hasPermission(url: string) {
  const useStore = userInfoStore();
  const logged = useStore.logged;

  // 在白名单中或已登录，直接跳转
  if (whiteList.indexOf(url) !== -1 || logged) {
    return true;
  }
  return false;
}

list.forEach((item) => {
  uni.addInterceptor(item, {
    // 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转

    invoke(e) {
      console.log("hasPermission========", e, hasPermission(e.url));
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
