import type { SafeAny } from "./types";

/** 用来生成唯一key的计数器 */
let count = 1;

export const common = {
  /**
   * 判空方法
   * @param value
   * @returns
   */
  isBlank(value: string | SafeAny[] | SafeAny): boolean {
    if (value == null) {
      return true;
    }
    if (typeof value === "string") {
      return value.trim().length === 0;
    } else if (Array.isArray(value)) {
      return value.length === 0;
    }
    return false;
  },
  /**
   * 判断非空方法
   * @param value
   * @returns
   */
  isNotBlank(value: string | SafeAny[] | SafeAny): boolean {
    return !common.isBlank(value);
  },
  /**
   * 解析url中的参数
   * @param url 需要被解析的url，默认解析当前页面的url
   * @returns 返回一个包含所有参数的对象
   */
  getUrlParams(url: string = window.location.href): { [key: string]: any } {
    // 通过 ? 分割获取后面的参数字符串
    const p: any = {};
    url?.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (p[k] = v));
    return p;
  },
  /**
   * 获取url中指定参数
   * @param name 参数名称
   * @returns
   */
  getUrlParam(name: string): string {
    return common.getUrlParams()[name];
  },

  /**
   * 获取一个唯一key（仅在一个客户端唯一，如需获取永不重复的key请使用getGuid函数）
   *
   * 生成规则：时间戳+随机数+自增序号
   * @param prefix
   * @returns 返回一个不重复的key
   */
  getOnlyKey(prefix: string = "DTM") {
    return `${prefix}_${new Date().getTime()}_${Math.floor(
      Math.random() * 100
    )}${count++}`;
  },
  /**
   * 防抖函数
   * @param fn 执行函数
   * @param wait 等待时间
   * @param triggleNow 是否立即触发
   */
  debounce(fn: Function, wait: number = 200, triggleNow = false): Function {
    let t = null;
    return function (...params: any[]) {
      const _self = this,
        args = params;
      if (t) {
        clearTimeout(t);
      }

      if (triggleNow) {
        const exec = !t;
        t = setTimeout(() => (t = null), wait);
        if (exec) {
          fn.apply(_self, args);
        }
      } else {
        t = setTimeout(() => fn.apply(_self, args), wait);
      }
    };
  },
  /**
   * 节流函数
   * @param fn 执行函数
   * @param delay 等待时间
   */
  throttle(fn: Function, delay = 200): Function {
    let t = null,
      begin = new Date().getTime();
    return function (...params: any[]) {
      const _self = this,
        args = params,
        cur = new Date().getTime();
      if (t) {
        clearTimeout(t);
      }

      if (cur - begin > delay) {
        fn.apply(_self, args);
        begin = cur;
      } else {
        t = setTimeout(() => fn.apply(_self, args), delay);
      }
    };
  },
};

export default common;
