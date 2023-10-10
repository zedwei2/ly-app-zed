import { createSSRApp } from "vue";
import * as Pinia from "pinia";
import Vant from "vant";
import "vant/lib/index.css";

/**拦截器 */
// import "@/utils/interceptor";
/**公共样式 */
import "@/assets/styles/index.less";
import CustomNavbar from "@/components/nav-bar/index.vue";

import App from "./App.vue";

export function createApp() {
  const app = createSSRApp(App);
  // 全局注册导航栏组件
  app.component("custom-navbar", CustomNavbar);
  app.use(Vant);
  app.use(Pinia.createPinia());

  return {
    app,
  };
}
