import { Toast } from "vant";

import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

import common from "@/utils/common";
import { global } from "@/utils/global";
import userService from "@/services/user.service";
import { ResponseCode } from "@/core/enum/response";
import userInfoStore from "@/store/user";
import { toLogin } from "./router";

/**
 * 拦截请求
 */
axios.interceptors.request.use(
  (config: any) => {
    const useStore = userInfoStore();
    const token = useStore.token;
    if (common.isBlank(config.url)) {
      throw new Error("接口名称为空");
    }
    if (config.baseURL == null && !config.url.startsWith("http")) {
      // 默认使用平台服务
      config.baseURL = (global.service as any).platform;
    }
    if (!config.timeout) {
      // 设置默认超时时间
      config.timeout = (global.system as any).timeout;
    }
    // 当没设值token时，向请求头添加token
    if (
      token &&
      common.isBlank(config.headers.token) &&
      !config.url.endsWith("/user/login")
    ) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 拦截响应
 */
axios.interceptors.response.use(
  (res: AxiosResponse) => {
    if (common.isNotBlank(res.headers.token)) {
      // 更新token（当token快过期时，接口会返回新的token，在此处替换）
      userService.updateToken(res.headers.token);
    }

    /** 外部接口不做拦截，直接放行 */
    if (res.config.headers.noIntercept) {
      return res;
    }

    if (res?.status === 200) {
      const code = res.data.errno;
      if (code === ResponseCode.SUCCESS) {
        return res.data;
      } else if (code === 103) {
        userService.logout();
        return;
      }
      if (
        res.config.responseType == "blob" ||
        res.config.responseType == "arraybuffer"
      ) {
        return res.data;
      }
    }

    // 判断请求头中是否配置不提示错误信息
    if (!res.config.headers.noTipsMessage) {
      errTip(res.config, res.data?.errmsg);
    }
    return Promise.reject(res.data?.errmsg);
  },
  (err: AxiosError) => {
    errTip(err.config as any, err?.message);
    return Promise.reject(err); // 返回错误信息
  }
);

/**
 * 提示错误信息
 * @param config axios配置对象
 * @param msg 要提示的错误信息文字
 */
const errTip = (config: AxiosRequestConfig, msg: string) => {
  uni.showToast({
    title: msg,
    icon: "error",
  });
};

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
