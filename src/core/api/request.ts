import env from "@/core/config/env";
import { hideLoading, showLoading } from "@/core/config/serviceLoading";
import { getCommonParams } from "@/core/config/commonParams";

import { isDevelopment, isH5 } from "./platform";

/** h5环境开启代理*/
const apiBaseUrl = isH5 && isDevelopment ? "/api" : env.apiBaseUrl;

/**
 * 封装请求的方法
 * @param url 请求接口
 * @param method 方法
 * @param data 入参
 * @param timeout 接口超时时间
 * @returns
 */
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
  data: any,
  timeout?: number
) {
  return new Promise((resolve, reject) => {
    showLoading(data.isLoading);
    delete data.isLoading;
    let responseDate: unknown;
    uni.request({
      url: apiBaseUrl + url,
      method: method,
      data: data,
      timeout: timeout || 20000,
      header: {
        "Content-Type":
          method === "GET"
            ? "application/json; charset=utf-8"
            : "application/x-www-form-urlencoded",
      },
      success: (res: any) => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          if (res.data.errno === 0) {
            responseDate = res.data;
          } else {
            reject(res.data);
          }
        } else {
        }
      },
      fail: () => {
        reject({
          errno: -1,
          errmsg: "网络不给力，请检查你的网络设置~",
        });
      },
      complete: (data) => {
        console.log(data, "data");
        resolve(responseDate);
        hideLoading();
      },
    });
  });
}

const request = {
  get: <T>(api: string, params: any) =>
    baseRequest("GET", api, {
      ...getCommonParams(),
      ...params,
    }),
  post: <T>(api: string, params: any) =>
    baseRequest("POST", api, {
      ...getCommonParams(),
      ...params,
    }),
  put: <T>(api: string, params: any) =>
    baseRequest("PUT", api, {
      ...getCommonParams(),
      ...params,
    }),
  delete: <T>(api: string, params: any) =>
    baseRequest("DELETE", api, {
      ...getCommonParams(),
      ...params,
    }),
};
export default request;
