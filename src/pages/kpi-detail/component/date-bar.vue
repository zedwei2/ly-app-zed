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
    <van-nav-bar
      class="time-select"
      :border="false"
      left-arrow
      :title="showCurrentTime"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="arrow" size="12" color="#333333" />
      </template>
      <template #left>
        <van-icon name="arrow-left" size="12" color="#333333" />
      </template>
    </van-nav-bar>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import dayjs from "dayjs";

const weekList = {
    1: "星期一",
    2: "星期二",
    3: "星期三",
    4: "星期四",
    5: "星期五",
    6: "星期六",
    0: "星期天",
  },
  showCurrentTime = ref(""),
  currentTime = ref();
const dateList = [
    { key: "day", label: "日", index: 0 },
    { key: "week", label: "周", index: 1 },
    { key: "month", label: "月", index: 2 },
    { key: "year", label: "年", index: 3 },
  ],
  isActive = ref(0),
  currentType = computed(() => dateList[isActive.value].key);

const changeDate = (index: number) => {
  isActive.value = index;
  handleDate(currentTime.value, currentType.value);
};

/**处理时间展示 */
const handleDate = (intialTime: any, type: string) => {
  currentTime.value = intialTime;
  //获取年月日
  let year = intialTime.format("YYYY");
  let month = intialTime.format("MM");
  let day = intialTime.format("DD");
  let time = intialTime.format("HH:mm");
  let week = dayjs(intialTime).day();

  switch (type) {
    case "day":
      showCurrentTime.value = `${month}月${day}日/${weekList[week]}  ${time}`;
      break;
    case "week":
      //获取当周时间段
      let week_time = dayjs(intialTime);
      let start_time = week_time.startOf("week").add(1, "day").format("DD");
      let end_time = week_time.endOf("week").add(1, "day").format("DD");
      //跨月的情况
      let end_month = week_time.endOf("week").add(1, "day").format("MM");
      showCurrentTime.value = `${month}月${start_time}日-${end_month}月${end_time}日  ${month}月${day}日`;
      break;
    case "month":
      showCurrentTime.value = `${month}月 -${month}月${day}日`;
      break;
    case "year":
      showCurrentTime.value = `${year}年 -${month}月`;
      break;
  }
};

/**获取当前时间 */
const getCurrentTime = () => {
  const now = new Date();
  const currentDate = dayjs(now);
  handleDate(currentDate, "day");
};

const onClickLeft = () => {
  switch (currentType.value) {
    case "day":
      currentTime.value = dayjs(currentTime.value).subtract(1, "day");
      break;
    case "week":
      currentTime.value = dayjs(currentTime.value).subtract(7, "day");
      break;
    case "month":
      currentTime.value = dayjs(currentTime.value).subtract(1, "month");
      break;
    case "year":
      currentTime.value = dayjs(currentTime.value).subtract(1, "year");
      break;
  }
  handleDate(currentTime.value, currentType.value);
};
const onClickRight = () => {
  switch (currentType.value) {
    case "day":
      currentTime.value = dayjs(currentTime.value).add(1, "day");
      break;
    case "week":
      currentTime.value = dayjs(currentTime.value).add(7, "day");
      break;
    case "month":
      currentTime.value = dayjs(currentTime.value).add(1, "month");
      break;
    case "year":
      currentTime.value = dayjs(currentTime.value).add(1, "year");
      break;
  }
  handleDate(currentTime.value, currentType.value);
};

getCurrentTime();
</script>

<style scoped lang="less">
.date-nav {
  background: #ebecf3;
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
<style lang="less">
.time-select {
  :deep(.van-nav-bar__title) {
    font-size: 14px;
    font-weight: 700;
    color: #45dde1;
  }
}
</style>
