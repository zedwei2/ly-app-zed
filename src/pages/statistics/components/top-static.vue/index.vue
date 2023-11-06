<template>
  <view class="top-static">
    <view v-for="(item, index) in totalInfoList" :key="index">
      <card :cardInfo="item" :key="index" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";

import twinsService from "@/api/twins-service";
import card from "./card/index.vue";

/**患者统计数据 */
const totalInfoList = ref([
  {
    label: "患者总人数",
    number: 0,
    color: "#F64849",
    key: "patientTotal",
  },
  {
    label: "历史预警人数",
    number: 0,
    color: "#0377FB",
    key: "historyWarningTotal",
  },
  {
    label: "未预警人数",
    number: 0,
    color: "#3CD495",
    key: "notWarningTotal",
  },
  {
    label: "今日预警人数",
    number: 0,
    color: "#FABD00",
    key: "todayWarningTotal",
  },
]);

/**查询患者统计数据
 * @returns
 */
const queryData = () => {
  twinsService
    .queryPatientStatic()
    .then((res: any) => {
      totalInfoList.value.map((item) => {
        item.number = res.data[item.key] || 0;
        return item;
      });
    })
    .catch((err: any) => {});
};

onShow(() => {
  queryData();
});
</script>
<style lang="less" scoped>
.top-static {
  display: flex;
  justify-content: space-between;
  > view {
    width: 25%;
  }
  > view:not(:last-child) {
    margin-right: 16rpx;
  }
}
</style>
