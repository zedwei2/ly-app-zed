<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
onLaunch(() => {
  console.log('App Launch');
});
onShow(() => {
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});
</script>

<style lang="scss">
uni-page-body,
html,
body {
  height: 100%;
}
//tab样式
.uni-tabbar {
  margin: 10px 16px;
  border-radius: 55px;
  box-shadow: 0 1px 4px 3px rgba(0, 0, 0, 0.05);
  // 上边框
  .uni-tabbar-border {
    display: none;
  }
  .uni-tabbar__item {
    padding: 9px 0;
  }
}
</style>

