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
  /**数据持久化 */
  const store = createPinia();
  store.use(piniaPluginPersistedstate);
  /**全局注册导航栏组件 */
  app.component("custom-navbar", CustomNavbar);
  app.use(Vant);
  app.use(store);

  return {
    app,
  };
}
