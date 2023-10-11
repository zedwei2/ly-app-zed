<template>
  <view
    class="custom-legend"
    >
    <view class="legend-item"  
      v-for="item in tipData"
      :key="item.name">
      <text :class="item.icon">{{ item.name }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
  defineProps({
    tipData: {
      type: Array,
      default: [],
    },
  });
  
</script>

<style lang="less">
 .custom-legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 10rpx auto 0;
    .legend-item {
      margin: 16rpx;
      color:#242429;
      font-size: 24rpx;
      line-height: 32rpx; 
      text {
        position: relative;
        margin: 0 20rpx;
        &::before {
          content: '';
          position: absolute;
          top: 6rpx;
          left: -40rpx;
          width: 4rpx;
          height: 4rpx;
          background: white;
          border: 10rpx solid transparent;
          border-radius: 50%;
        }
        &.dangerous::before {
          border-color: #FF5D63;
        }
        &.warning::before {
          border-color: #FD7704;
        }
        &.success::before {
          border-color: #42BA3F;
        }
        &.tips::before {
          width: 0;
          height: 0;
          border-top: 16rpx solid #F97602;
          border-right: 14rpx solid transparent;
          border-left: 14rpx solid transparent;
          border-radius: unset;
          top: 10rpx;
        }
      }
      
    }
  }
</style>
