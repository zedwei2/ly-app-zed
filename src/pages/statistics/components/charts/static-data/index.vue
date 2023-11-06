<template>
  <view>
    <staticRing :pie-data="pieData" />
    <staticColum :trend-data="trendData" :alert-type="alertType" />
  </view>
</template>

<script setup lang="ts">
import { ref, toRefs, watch, computed } from "vue";
import { onShow } from "@dcloudio/uni-app";

import twinsService from "@/api/twins-service";

import { HeartRateMappings, SpO2Mappings } from "../../../mapping";
import staticRing from "./components/static-ring.vue";
import staticColum from "./components/static-colum.vue";

interface ObjDTO {
  value?: string;
  name?: string;
  color?: string;
  percent?: number;
}

const props = defineProps({
  alertType: {
    type: String,
    default: "",
  },
  dateType: {
    type: String,
    default: "",
  },
});

const { alertType, dateType } = toRefs(props);

/**占比映射 */
const percentMapping = {
  patientTotal: {
    name: "占总患者人数",
    color: "#11A5AC",
  },
  warningTotal: {
    name: "占预警人数",
    color: "#FFB907",
  },
};

/**饼图数据-左边图表 */
const pieData = ref<ObjDTO[]>([]);
/** 预警数据-右边图表*/
const trendData = ref({});

/**饼图属性映射 */
const attributeMappings = computed(() => {
  return props.alertType === "HeartRate" ? HeartRateMappings : SpO2Mappings;
});

const queryStaticData = () => {
  /**饼图属性映射 */
  pieData.value = [];
  trendData.value = [];

  twinsService
    .queryTypeStatic(dateType.value, alertType.value)
    .then((res) => {
      let data = (res as any).data;

      for (let key in data.typeStatistics) {
        let attributeInfo = attributeMappings.value[key];
        pieData.value.push({
          value: data.typeStatistics[key],
          name: attributeInfo?.name,
          color: attributeInfo?.color,
        });
      }

      let percentList = [];
      for (let key in percentMapping) {
        let percentInfo = percentMapping[key];
        percentList.push({
          name: percentInfo?.name,
          color: percentInfo?.color,
          percent: (data.warningTypeTotal / data[key]) * 100,
        });
      }
      percentList.forEach((item) => {
        item.percent = parseInt(item.percent);
        return item;
      });
      /**data: [{"name":"一班","value":82},{"name":"二班","value":63},{"name":"三班","value":86},{"name":"四班","value":65},{"name":"五班","value":79}] */
      trendData.value = {
        data: data.dateStatistics.map((item: any) => {
          return {
            name:
              dateType.value === "DAY" ? item.date.split(" ")[1] : item.date,
            value: item.value,
          };
        }),
        xAxisData: data.dateStatistics.map((item: any) => {
          if (dateType.value === "DAY") {
            return item.date.split(" ")[1];
          } else {
            return item.date;
          }
        }),
        warningTotal: data.warningTotal,
        patientTotal: data.patientTotal,
        warningTypeTotal: data.warningTypeTotal,
        percentList: percentList,
      };
    })
    .catch((err) => {});
};
onShow(() => {
  queryStaticData();
});

watch(
  () => [alertType.value, dateType.value],
  () => {
    queryStaticData();
  }
);
</script>
<style lang="less" scoped></style>
