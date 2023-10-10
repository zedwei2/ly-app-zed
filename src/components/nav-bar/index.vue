<template>
  <view class="custom-nav" ref="test">
    <view class="status_bar"> </view>
    <!-- <van-nav-bar :title="title" :left-arrow="isShowBack" fixed /> -->
  </view>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps({
  title: {
    type: String,
  },
  isShowBack: {
    type: Boolean,
    default: false,
  },
});
const { title, isShowBack } = toRefs(props);
</script>

<style scoped lang="less">
.custom-nav {
  z-index: 999;
  .status_bar {
    height: var(--status-bar-height);
    width: 100%;
  }

  .van-nav-bar {
    top: 20px;
    background: none;
    color: #fff;
    text-align: center;
    font-weight: 500;
    line-height: 30px; /* 200% */
    // height: 66px;
  }
}
</style>
