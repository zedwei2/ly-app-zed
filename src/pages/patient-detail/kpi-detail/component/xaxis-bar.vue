<template>
  <view class="custom-xaxis">
    <text
      v-for="(item, key) in xAxisData"
      :class="item.isActive ? 'active' : ''"
      :key="key"
      @click="onItemClick(key)"
      >{{ item.name }}</text
    >
  </view>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps({
  xAxisData: {
    type: Array<any>,
    default: [],
  },
});

let { xAxisData } = toRefs(props);

const onItemClick = (key: number) => {
  xAxisData.value = xAxisData.value?.map((item: any, k: number) => { 
    item.isActive = key === k 
    return item
  })
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
