<template>
   <view class="hr-chart">
      <view class="hr-chart-title"><text>65</text>次/分钟</view>
        <qiun-data-charts 
          type="candle"
          :opts="chart.opts"
          :chartData="chart.chartData"
        
        />
      <view
        class="custom-xaxis"
        >
        <text 
          v-for="item in xAxisData"
          :class="item.isActive ? 'active' : ''"
          :key="item.name">{{ item.name }}</text>
      </view>
    </view>
</template>

<script lang="ts" setup>
const xAxisData = [
  {
    name: '09/22 周一',
    isActive: false
  },
  {
    name: '09/23 周二',
    isActive: false
  },
  {
    name: '09/24 周三',
    isActive: false
  },
  {
    name: '09/25 周四',
    isActive: true
  },
  {
    name: '09/26 周五',
    isActive: false
  },
  {
    name: '09/27 周六',
    isActive: false
  },
  {
    name: '09/28 周天',
    isActive: false
  }
]

const chart = {
  chartData: {
    categories: ['09/22 周一', '09/23 周二', '09/24 周三', '09/25 周四', '09/26 周五', '09/27 周六', '09/28 周天'],   
    series: [
      {
        name: 'dada',
        data: [
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [60,103,60,60], // 第一个下限 第二个上限 第三个上影线 第四个下影线
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
        ]
      }
    ]
  },
  opts: {
        rotate: false,
        rotateLock: false,
        color: ["#FF6C71","#FF6C71","#FF6C71","#FF6C71","#FF6C71","#FF6C71","#FF6C71","#FF6C71","#FF6C71"],
        padding: [15,4,10,4],
        dataLabel: false,
        enableScroll: false,
        legend: {
          show: false
        },
        xAxis: {
          disabled: true,
        },
        yAxis: {
          gridType: "dash",
          data: [
            {
              axisLine: false,
              fontColor: '#92969A',
              min: 40,
              max: 140
            }
          ]
        },
        extra: {
          tooltip: {
            showBox: false,
            splitLine: true, 
            gridColor: '#FDDEDE',
          },
        }
      }
};


</script>

<style lang="less">
 .hr-chart {
    border: 2rpx solid #E9EEF0;
    padding: 32rpx 10rpx 20rpx 0;
    border-radius: 20rpx;
    .hr-chart-title {
      color: #92969A;
      font-size: 20rpx;
      line-height: 44rpx; 
      text-align: center;
      margin-bottom: 16rpx;
      text {
        color:rgba(0, 29, 69, 0.90);
        font-size: 60rpx;
        font-weight: 700;
        line-height: 72rpx; 
        margin-right: 12rpx;
      }
    }
    .custom-xaxis {
      display: flex;
      margin-left: 60rpx;
      text-align: center;
      justify-content: space-around;
      color:#92969A;
      font-size: 24rpx;
      font-weight: 500;
      line-height: 40rpx; /* 166.667% */
      text.active {
        color: #fff;
        border-radius: 8rpx;
        background: linear-gradient(180deg, #FF5D63 0%, #DE4A4A 100%);
      }
    }
  }
</style>
