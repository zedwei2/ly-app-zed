<template>
  <view class="xaxis-bar">
    <view v-if="type === dateType.Day">
      <text v-for="(item, key) in xAxisData" :key="key">{{ item }}</text>
    </view>
    <view v-else>
      <view v-for="(item, index) in xAxisData">
        <text
          :class="activeIndex === index ? 'active' : ''"
          :key="index"
          @click="onItemClick(index)"
          >{{ item.date }}</text
        >
        <text> {{ item.week }} </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { toRefs, ref, watch } from "vue";

import { dateType } from "@/core/enum/dateType";

const props = defineProps({
  type: {
    type: String,
    default: "day",
  },
  activeIndex: {
    type: Number,
    default: 0,
  },
});

let { type, activeIndex } = toRefs(props);

const xAxisData = ref();

/**获取当前x轴，具体看后端数据怎么传，可能之后直接取后端传的值 */
watch(
  () => type.value,
  (val) => {
    if (val === dateType.Day) {
      xAxisData.value = ["00:00", "06:00", "12:00", "18:00", "24:00"];
    } else if (val === dateType.Week) {
      xAxisData.value = [
        { date: "09/22", week: "周一" },
        { date: "09/23", week: "周二" },
        { date: "09/24", week: "周三" },
        { date: "09/25", week: "周四" },
        { date: "09/26", week: "周五" },
        { date: "09/27", week: "周六" },
        { date: "09/28", week: "周天" },
      ];
    } else if (val === dateType.Month) {
      xAxisData.value = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ];
    } else {
      xAxisData.value = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ];
    }
  },
  {
    immediate: true,
  }
);

const onItemClick = (key: number) => {
  // xAxisData.value = xAxisData.value?.map((item: any, k: number) => {
  //   item.isActive = key === k
  //   return item
  // })
};
</script>

<style lang="less" scoped>
.xaxis-bar {
  padding: 6rpx 0 0 88rpx;
  > view {
    display: flex;
    justify-content: space-between;
    color: #92969a;
    font-size: 20rpx;
    font-weight: 500;
    // line-height: 40rpx; /* 166.667% */
    text-align: center;
    text {
      text-align: center;
      &.active {
        color: #fff;
        border-radius: 8rpx;
        background: linear-gradient(180deg, #ff5d63 0%, #de4a4a 100%);
      }
    }
  }
}
</style>
