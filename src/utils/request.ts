import { getCommonParams } from "@/config/commonParams";
import env from "@/config/env";
import { hideLoading, showLoading } from "@/config/serviceLoading";
import userInfoStore from "@/store/user";
import common from "@/utils/common";
import userService from "@/services/user.service";
import { ResponseCode } from "@/core/enum/response";
import type { ResponseDTO } from "@/core/enum/response";

import { isDevelopment, isH5 } from "./platform";
import { forward } from "./router";

function baseRequest(
  method:
    | "OPTIONS"
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "TRACE"
    | "CONNECT"
    | undefined,
  url: string,
  data: { isLoading: any }
) {
  return new Promise((resolve, reject) => {
    showLoading(data.isLoading);
    delete data.isLoading;
    let responseDate: unknown;
    uni.request({
      url: url,
      method,
      timeout: 20000,
      header: {
        "content-type": "application/json; charset=utf-8",
        ...getCommonParams(),
      },
      data,
      success: (res: any) => {
        if (common.isNotBlank(res.header.token)) {
          // 更新token（当token快过期时，接口会返回新的token，在此处替换）
          userService.updateToken(res.header.token);
        }
        if (res?.statusCode === 200) {
          const code = res.data.errno;
          if (code === ResponseCode.SUCCESS) {
            return resolve(res.data);
          } else if (code === 103) {
            userService.logout();
            return;
          } else {
            return reject(res.data);
          }
        }
      },
      fail: (err) => {
        return reject(err);
      },
      complete: (data) => {
        hideLoading();
      },
    });
  });
}

const http = {
  get: <T>(api: string, params?: any) =>
    baseRequest("GET", api, {
      ...params,
    }),
  post: <T>(api: string, params?: any) =>
    baseRequest("POST", api, {
      ...params,
    }),
};

export default http;
