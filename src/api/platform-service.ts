import http from "@/utils/request";
import global from "@/utils/global";

const baseURL = global.service?.platform;

const platformService = {
  login: (account: string, password: string, uuid: string, captcha?: string) =>
    http.post(`${baseURL}/user/login`, {
      account: account,
      password: password,
      uuid: uuid,
    }),
};

export default platformService;
