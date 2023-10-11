import { isFastClick, parseUrl, restoreUrl } from "./shared";
import { getUrlType, h5HsqMap, whiteList, pagesMap } from "./urlMap";
import { getCommonParams } from "@/config/commonParams";

export function onUrlPage(e: any) {
  if (isFastClick()) return;
  const { url } = e.currentTarget.dataset;

  if (!url) return;
  const urlType = getUrlType(url);
  const { name, path, query } = parseUrl(url);
  if (urlType === "topic") {
    // 专题页
    forward("topic", Object.assign({ url: path }, query));
  } else if (urlType === "h5Hsq") {
    if (h5HsqMap.includes(name)) {
      if (!whiteList.includes(name)) return forward("login");
      // h5页面
      forward("web-view", Object.assign({ url: path }, query));
    } else {
      // 原生页
      forward(name, query);
    }
  } else if (urlType === "other" && pagesMap.find((i) => i.name === name)) {
    // 原生页
    forward(name, query);
  } else {
    // 不跳转
  }
}

/**跳转下一级页面 */
export function forward(name: string, query: Types.Query = {}): any {
  const usrObj = uni.getStorageSync("userInfo");
  const token = usrObj && JSON.parse(usrObj).token;
  if (!whiteList.includes(name) && !usrObj && !token) {
    uni.reLaunch({
      url: "/pages/login/index",
    });
    return;
  }

  const targetPage = pagesMap.find((i) => i.name === name);
  if (!targetPage) return;
  console.log("targetPage===", targetPage);
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
