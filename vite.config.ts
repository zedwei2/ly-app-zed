import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
/**解决无法使用require的问题 */
import requireTransform from "vite-plugin-require-transform"; // 1. 引入插件

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    requireTransform({
      fileRegex: /.js$|.vue$/,
    }),
  ],
});
