<template>
  <view class="hr-detail">
    <dateBar />
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import dateBar from "./date-bar.vue";
</script>

<style scoped lang="less">
.date-nav {
  background: #9ca4ab;
  border-radius: 12px;
  display: flex;
  justify-content: space-around;

  .navTitle {
    font-size: 16px;
    font-weight: 500;
    line-height: 22px; /* 137.5% */
    display: flex;
    justify-content: center;
    width: 100%;
    > text {
      padding: 16px;
    }
  }
  .active {
    position: relative;
    background: linear-gradient(91deg, #45dde1 2.47%, #09ccd5 99.67%);
    font-weight: 500;
    color: #fff;
    border-radius: 12px;
  }
}
</style>
