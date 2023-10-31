import { defineStore } from "pinia";

interface UserInfo {
  token: string;
  userId: Number;
}
const userInfoStore = defineStore("userInfo", {
  persist: true, //开启持久化
  state: () => {
    return {
      userInfo: {
        token: "",
        userId: null,
      },
    };
  },
  getters: {
    logged: (state) => {
      const { token, userId } = state.userInfo;
      return !!(token && userId);
    },
    token: (state) => {
      return state.userInfo.token;
    },
    userId: (state) => {
      return state.userInfo.userId;
    },
  },
  actions: {
    setUserInfo(userInfo: UserInfo) {
      Object.assign(this.userInfo, userInfo);
    },
  },
});

export default userInfoStore;
