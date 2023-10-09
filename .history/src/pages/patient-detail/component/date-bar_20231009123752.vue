<template>
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
</template>

<script lang="ts" setup>
import { defineComponent, ref, reactive } from "vue";
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

<style scoped lang="scss">
.date-nav {
  display: flex;
  justify-content: space-around;
  border-radius: 12px;
  background: #9ca4ab;
  .navTitle {
    display: flex;
    justify-content: center;
    width: 100%;
    line-height: 22px; /* 137.5% */
    font-weight: 500;
    font-size: 16px;
    > text {
      padding: 16px;
    }
  }
  .active {
    position: relative;
    border-radius: 12px;
    background: linear-gradient(91deg, #45dde1 2.47%, #09ccd5 99.67%);
    font-weight: 500;
    color: #fff;
  }
}
</style>
