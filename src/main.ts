import { createSSRApp } from "vue";
import Vant from "vant";
import "vant/lib/index.css";

// import * as Pinia from "pinia";
// import "amfe-flexible";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

/**拦截器 */
// import "@/utils/interceptor";
/**公共样式 */
import "@/assets/styles/index.less";
import CustomNavbar from "@/components/nav-bar/index.vue";

import App from "./App.vue";

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  // 全局注册导航栏组件
  app.component("custom-navbar", CustomNavbar);
  app.use(Vant);
  app.use(pinia);

  // app.use(Pinia.createPinia());

  return {
    app,
    // Pinia,
  };
}
