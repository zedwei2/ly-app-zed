import userInfoStore from "@/store/user";

const commonParams = {
  isLoading: true,
};

/**获取token和用户信息,后续可能改成store存储 */
export function getCommonParams() {
  const uniStore = JSON.parse(uni.getStorageSync("userInfo"));
  const useStore = userInfoStore();
  const token = useStore.token;
  const uesrId = useStore.userId;
  return Object.assign(
    {
      token: token || uniStore?.token,
      uuid: uesrId || uniStore?.user?.id,
      timestamp: Date.now(),
    },
    commonParams
  );
}

export function setCommonParams(params: Object) {
  Object.assign(commonParams, params);
}
