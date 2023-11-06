import { isFastClick, parseUrl, restoreUrl } from "./shared";
import { getUrlType, h5HsqMap, whiteList, pagesMap } from "./urlMap";
import userInfoStore from "@/store/user";

/**跳转下一级页面 */
export function forward(name: string, query: Types.Query = {}): any {
  const useStore = userInfoStore();
  const logged = useStore.logged;
  if (!whiteList.includes(name) && !logged) {
    uni.reLaunch({
      url: "/pages/login/index",
    });
    return;
  }

  const targetPage = pagesMap.find((i) => i.name === name);
  if (!targetPage) return;
  const isReplace = query.replace;
  delete query.replace;
  const { type, path } = targetPage;
  const url = restoreUrl(path, query);
  const params = { url };
  if (type === "tabBarPage") return uni.switchTab(params);
  if (!isReplace) return uni.navigateTo(params);
  uni.redirectTo(params);
}

/**返回上一级页面 */
export function back(delta: number) {
  uni.navigateBack({
    delta,
  });
}

/**跳转登录 */
export function toLogin() {
  return forward("login");
}
