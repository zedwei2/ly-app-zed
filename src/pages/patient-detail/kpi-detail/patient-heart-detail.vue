<template>
  <view class="hr-detail">
    <dateBar @changeDate="onDataChange" />
    <!-- <hrDayChart v-if="activeType === 'day'" @getCurrentData="getCurrentData" />
    <hrWeekChart
      v-else-if="activeType === 'week'"
      @getCurrentData="getCurrentData"
    />
    <hrMonthChart v-else @getCurrentData="getCurrentData" /> -->
    <baseChart :type="activeType" />
    <!-- <infoCard :infoData="hrCardData" :isUnit="true" /> -->
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import dateBar from "./component/date-bar.vue";
import hrDayChart from "./component/hr-day-chart.vue";
import hrWeekChart from "./component/hr-week-chart.vue";
import hrMonthChart from "./component/hr-month-chart.vue";
import baseChart from "./component/base-chart.vue";
import infoCard from "./component/info-card.vue";

const hrCardData = reactive([
  {
    title: "心率范围",
    value: "60-103",
  },
  {
    title: "平均静息心率",
    value: "68",
  },
  {
    title: "心率过高",
    value: "--",
  },
  {
    title: "心率过低",
    value: "--",
  },
]);

const activeType = ref("day"),
  currentDate = ref();
const onDataChange = (type: string) => {
  activeType.value = type;
};

/**获取当前选中点的数据 */
const getCurrentData = (data: string) => {
  hrCardData[0].value = data;
};
</script>

<style scoped lang="less">
.hr-detail {
  padding: 16px 18px;
}
</style>
