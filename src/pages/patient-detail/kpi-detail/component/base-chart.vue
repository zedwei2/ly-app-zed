<template>
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
      <text
        v-for="(item, key) in xAxisData"
        :key="key"
        >{{ item }}</text
      >
    </view>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps({
  chart: {
    type: Object
  },
  xAxisData: {      // 自定义x轴数据
    type: Array<any>,
    default: [],
  },
  xAxisHasActive: { // 是否开启x轴选中效果 默认开启
    type: Boolean,
    default: true,
  }
});

let { xAxisData } = toRefs(props);

/**
 * 更新x轴选中数据状态
 * @param currentIndex 
 */
const xAxisDataUpdate = (currentIndex: number) => {
  xAxisData.value = xAxisData.value?.map((item: any, k: number) => { 
    item.isActive = currentIndex === k 
    return item
  })
}

/**
 * 自定义x轴点击事件
 * @param key 
 */
const onItemClick = (key: number) => {
  xAxisDataUpdate(key)
}

/**
 * 点击自定义x轴 动态变色
 * @param val 
 */
const getIndex = (val: any) => {
  console.log(val, !props.xAxisHasActive)
  // 未开启x轴选中效果 则退出
  if (!props.xAxisHasActive) return 

  if (val.currentIndex.index === -1) return

  xAxisDataUpdate(val.currentIndex.index)
}

</script>

<style lang="less" scoped>
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
