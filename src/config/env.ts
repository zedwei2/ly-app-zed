const apiEnv: ApiEnv = "dev";

const envMap = {
  dev: {
    baseUrl: "https://api.test.zhlttech.com",
    apiBaseUrl: "https://api.test.zhlttech.com",
  },

  prod: {
    baseUrl: "https://m.xxx.com",
    apiBaseUrl: "https://m.api.xxx.com",
  },
};

type ApiEnv = keyof typeof envMap;
type Env<T extends ApiEnv> = {
  apiEnv: T;
} & (typeof envMap)[T];

function createEnv(apiEnv: ApiEnv): Env<typeof apiEnv> {
  return Object.assign({ apiEnv }, envMap[apiEnv]);
}

const env = createEnv(apiEnv);
export default env;
