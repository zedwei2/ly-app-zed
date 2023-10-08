import { createSSRApp } from "vue";

/**拦截器 */
import "@/core/api/interceptor";
/**公共样式 */
import "@/assets/styles/index.less";

import App from "./App.vue";

export function createApp() {
  const app = createSSRApp(App);

  return {
    app,
  };
}
