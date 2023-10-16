<template>
  <view class="hr-chart-title"
    ><text>{{ currentData }}</text
    ><text class="unit">次/分钟</text></view
  >
  <qiun-data-charts
    :type="chart?.type"
    :opts="chart?.opts"
    :chartData="chart?.chartData"
    @getIndex="getIndex"
  />

  <view class="custom-xaxis" v-if="xAxisHasActive">
    <text
      v-for="(item, key) in xAxisData"
      :class="item.isActive ? 'active' : ''"
      :key="key"
      @click="onItemClick(key)"
      >{{ item.name }}</text
    >
  </view>
  <view class="custom-xaxis" v-else>
    <text v-for="(item, key) in xAxisData" :key="key">{{ item }}</text>
  </view>
</template>

<script setup lang="ts">
import { toRefs, ref } from "vue";

const props = defineProps({
  chart: {
    type: Object,
  },
  xAxisData: {
    // 自定义x轴数据
    type: Array<any>,
    default: [],
  },
  xAxisHasActive: {
    // 是否开启x轴选中效果 默认开启
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    default: "day",
  },
});

const complete = (q: any) => {
  console.log(222, q);
};

let { xAxisData, type, chart } = toRefs(props);

const currentData = ref<String>("65");

/**
 * 更新x轴选中数据状态
 * @param currentIndex
 */
const xAxisDataUpdate = (currentIndex: number) => {
  xAxisData.value = xAxisData.value?.map((item: any, k: number) => {
    item.isActive = currentIndex === k;
    return item;
  });
};

/**
 * 自定义x轴点击事件
 * @param key
 */
const onItemClick = (key: number) => {
  // 暂时关闭 未找到点击x轴 选中对应数据的方法
  // xAxisDataUpdate(key)
};

/**
 * 点击自定义x轴 动态变色
 * @param val
 */
const getIndex = (val: any) => {
  console.log(val, !props.xAxisHasActive);
  // 未开启x轴选中效果 则退出
  if (!props.xAxisHasActive) return;

  if (val.currentIndex.index === -1) return;
  console.log("type.value====", type.value);
  let currentItem = val.opts.series[0].data[val.currentIndex.index];
  if (type.value === "month") {
    currentData.value = `${currentItem[0]}-${currentItem[1]}`;
  } else {
    currentData.value = `${currentItem[0]}`;
  }
  xAxisDataUpdate(val.currentIndex.index);
};
</script>

<style lang="less" scoped>
.hr-chart-title {
  color: #92969a;
  font-size: 20rpx;
  line-height: 44rpx;
  text-align: center;
  margin-bottom: 16rpx;
  text {
    color: rgba(0, 29, 69, 0.9);
    font-size: 60rpx;
    font-weight: 700;
    line-height: 72rpx;
    margin-right: 12rpx;
  }
  .unit {
    color: #92969a;
    font-size: 20rpx;
    font-weight: 400;
    line-height: 44rpx; /* 220% */
  }
}
.custom-xaxis {
  display: flex;
  margin-left: 60rpx;
  text-align: center;
  justify-content: space-around;
  color: #92969a;
  font-size: 24rpx;
  font-weight: 500;
  line-height: 40rpx; /* 166.667% */

  text {
    min-width: 32rpx;
    &.active {
      color: #fff;
      border-radius: 8rpx;
      background: linear-gradient(180deg, #ff5d63 0%, #de4a4a 100%);
    }
  }
}
</style>
