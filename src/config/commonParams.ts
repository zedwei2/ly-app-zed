const commonParams = {
  isLoading: true,
};

/**获取token和用户信息,后续可能改成store存储 */
export function getCommonParams() {
  // const { token, userId } = useStore("user");

  const userInfo = uni.getStorageSync("userInfo");

  const { token, userId } = userInfo;
  console.log("token==token==", token);
  return Object.assign(
    { token: token, uuid: userId, timestamp: Date.now() },
    commonParams
  );
}

export function setCommonParams(params: Object) {
  Object.assign(commonParams, params);
}
