import { common } from "@/utils/common";
import { cache, CacheEnum } from "@/utils/cache";
import global from "@/utils/global";

import userInfoStore from "@/store/user";
import { forward } from "@/utils/router";

/** 用户相关服务，管理登录、凭证等信息 */
export default {
  /**
   * 设置登录信息
   * @param data
   */
  login(data: any) {
    const userStore = userInfoStore();
    if (common.isBlank(data)) {
      throw new Error("用户信息为空");
    }
    let userInfo = {
      user: data.user,
      token: data.token,
    };
    userStore.setUserInfo(userInfo);
    // 设置用户信息
    global.current.user = data.user;
    global.current.token = data.token;
    // 保存到缓存中
    cache.local.set(CacheEnum.DTM_PASSPORT, JSON.stringify(data));
    //uniapp存储
    uni.setStorageSync("userInfo", JSON.stringify(userInfo));
  },
  /**
   * 退出登录
   */
  logout() {
    const userStore = userInfoStore();
    cache.local.remove(CacheEnum.DTM_PASSPORT);
    userStore.setUserInfo({ token: "", user: {} });
    uni.clearStorage();
    forward("login");
  },

  /**
   * 更新token
   * @param token
   */
  updateToken(token: string) {
    const userStore = userInfoStore();
    const passport = cache.local.get(CacheEnum.DTM_PASSPORT);
    if (passport) {
      const data = JSON.parse(passport);
      data.token = token;
      userStore.setUserInfo(data);
      cache.local.set(CacheEnum.DTM_PASSPORT, JSON.stringify(data));
    }
  },
};
