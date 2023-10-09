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
   * 文件转Base64
   * @param file
   * @returns
   */
  fileToBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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
  toLogin() {
    uni.reLaunch({
      url: "/pages/login/index",
      success: () => {
        plus.navigator.closeSplashscreen();
      },
    });
  },
};

export default common;
