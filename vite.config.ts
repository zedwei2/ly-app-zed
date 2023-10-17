import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
/**解决无法使用require的问题 */
import requireTransform from "vite-plugin-require-transform"; // 1. 引入插件
import postCssPxToRem from "postcss-pxtorem";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    requireTransform({
      fileRegex: /.js$|.vue$/,
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          // rootValue: 37.5, // 75表示750设计稿，37.5表示375设计稿
          // propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
          // selectorBlackList: ["norem"], // 过滤掉norem-开头的class，不进行rem转换
        }),
      ],
    },
  },
});
