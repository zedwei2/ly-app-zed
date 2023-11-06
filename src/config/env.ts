const apiEnv: ApiEnv = "dev";

const envMap = {
  dev: {
    baseUrl: "http://192.168.0.121:18082/api",
    apiBaseUrl: "http://192.168.0.121:18082/api",
    appUrl: "http://192.168.0.121:18082",
  },

  prod: {
    baseUrl: "https://m.xxx.com",
    apiBaseUrl: "https://m.api.xxx.com",
    appUrl: "http://192.168.0.121:18082",
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
