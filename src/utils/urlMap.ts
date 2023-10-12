import pagesJson from "../pages.json";

// tabBar页面
const tabBarPagesMap = pagesJson.pages.map((i) => {
  return {
    type: "tabBarPage",
    name: i.name,
    path: `/${i.path}`,
  };
});

// 二级页面
const subPagesMap = pagesJson.subPackages.flatMap((i) => {
  return i.pages.map((x) => {
    return {
      type: "subPage",
      name: x.name,
      path: `/${i.root}/${x.path}`,
    };
  });
});

// h5页面
export const h5HsqMap = ["member-center"];

export const pagesMap = [...tabBarPagesMap, ...subPagesMap];

// 不需要登录权限的页面
export const whiteList = ["user-agreement", "privacy-policy"];

const types = {
  h5Hsq: /(m(\.dev|\.beta)?\.haoshiqi\.net\/v2)/i,
  topicType: /(topic(\.dev|\.beta)?\.doweidu\.com)/i,
  h5: /^(https|http):\/\//i,
};

/** 获取页面类型，暂时不需要*/
export function getUrlType(url: string) {
  if (types.h5Hsq.test(url)) return "h5Hsq";
  if (types.topicType.test(url)) return "topic";
  if (types.h5.test(url)) return "h5"; // 暂时笼统判断都是hsq Url
  return "other";
}
