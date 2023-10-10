<template>
  <view>
    <view class="date-nav">
      <view
        class="navTitle"
        v-for="(item, index) in dateList"
        :key="index"
        :class="{ active: isActive === index }"
        @click="changeDate(index)"
      >
        <text>{{ item.label }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const dateList = [
    { key: "day", label: "日", index: 0 },
    { key: "week", label: "周", index: 1 },
    { key: "month", label: "月", index: 2 },
    { key: "year", label: "年", index: 3 },
  ],
  isActive = ref(0);

const changeDate = (index: number) => {
  isActive.value = index;
};
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
