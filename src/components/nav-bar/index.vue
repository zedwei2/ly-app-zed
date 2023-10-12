<template>
  <view class="custom-nav" ref="test">
    <!-- <view class="status_bar"> </view> -->
    <view class="nav-title">
      <van-icon v-if="isShowBack" name="arrow-left" @click="goBack" />
      <view class="title">
        <text>
          {{ title }}
        </text>
      </view>
    </view>
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

const goBack = () => {
  uni.navigateBack({
    delta: 1, //返回层数，2则上上页
  });
};
</script>

<style scoped lang="less">
.custom-nav {
  z-index: 999;
  .status_bar {
    height: var(--status-bar-height);
    width: 100%;
  }

  .nav-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 66rpx 0 20rpx;
    color: #fff;
    .title {
      flex: 1;
      display: flex;
      justify-content: center;
    }
  }

  .van-nav-bar {
    top: 20px;
    background: none;
    color: #fff;
    text-align: center;
    font-weight: 500;
    line-height: 60rpx; /* 200% */
    // height: 66px;
  }
}
</style>
