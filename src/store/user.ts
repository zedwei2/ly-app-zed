import { defineStore } from "pinia";

interface UserInfo {
  token: string;
  user: Object;
}
const userInfoStore = defineStore("userInfo", {
  persist: true, //开启持久化
  state: () => {
    return {
      userInfo: {
        token: "",
        user: { id: null },
      },
    };
  },
  getters: {
    logged: (state) => {
      const { token, user } = state.userInfo;
      let id = user?.id || null;
      return !!(token && !!id);
    },
    token: (state) => {
      return state.userInfo.token;
    },
    user: (state) => {
      return state.userInfo.user;
    },
    userId: (state) => {
      return state.userInfo.user.id;
    },
  },
  actions: {
    setUserInfo(userInfo: UserInfo) {
      console.log("数据持久化-----", userInfo);
      Object.assign(this.userInfo, userInfo);
    },
  },
});

export default userInfoStore;
