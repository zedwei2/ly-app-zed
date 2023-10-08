const commonParams = {
  isLoading: true,
};

/**获取token和用户信息 */
export function getCommonParams() {
  const userInfo = uni.getStorageSync("userInfo");
  const { token, userId } = userInfo;

  return Object.assign(
    { token: token, uuid: userId, timestamp: Date.now() },
    commonParams
  );
}
export function setCommonParams(params: Object) {
  Object.assign(commonParams, params);
}
