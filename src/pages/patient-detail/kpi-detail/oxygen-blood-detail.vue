<template>
  <view class="spo-detail">
    <dateBar @changeDate="onDataChange" />
    <spoDayChart v-if="timeType === 'day'" @getCurrentData="getCurrentData" />
    <spoMonthChart v-else :type="timeType" @getCurrentData="getCurrentData" />
    <infoCard :infoData="spoCardData" />
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import dateBar from "./component/date-bar.vue";
import spoDayChart from "./component/spo-day-chart.vue";
import spoMonthChart from "./component/spo-month-chart.vue";
import infoCard from "./component/info-card.vue";
const spoCardData = reactive([
  {
    title: "最新值 15:55",
    value: "90%",
  },
  {
    title: "血氧范围",
    value: "89%-100%",
  },
]);

const timeType = ref("day");
/**获取当前修改的时间 */
const onDataChange = (type: string) => {
  timeType.value = type;
};

const getCurrentData = (data: any) => {
  spoCardData[1].value = data;
};
</script>

<style scoped lang="less">
.spo-detail {
  padding: 16px 18px;
}
</style>
