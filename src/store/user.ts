import { defineStore } from "pinia";

interface UserInfo {
  token: string;
  userId: Number;
}
export const userInfoStore = defineStore("userInfo", {
  state: () => {
    return {
      userInfo: {
        token: "token",
        userId: 111,
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
