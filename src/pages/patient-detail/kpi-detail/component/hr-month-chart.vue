<template>
   <view class="hr-chart">
      <view class="hr-chart-title"><text>89%-100%</text></view>
      <baseChart :chart="chart" :xAxisData="xAxisData"/>
      <tipLegend :tipData="legendData"/>
    </view>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import baseChart from  './base-chart.vue'
import tipLegend from './tip-legend.vue'

let xAxisData = reactive([
  {
    name: '1',
    isActive: false
  },
  {
    name: '2',
    isActive: false
  },
  {
    name: '3',
    isActive: false
  },
  {
    name: '4',
    isActive: false
  },
  {
    name: '5',
    isActive: false
  },
  {
    name: '6',
    isActive: false
  },
  {
    name: '7',
    isActive: false
  },
  {
    name: '8',
    isActive: false
  },
  {
    name: '9',
    isActive: true
  },
  {
    name: '10',
    isActive: false
  },
  {
    name: '11',
    isActive: false
  },
  {
    name: '12',
    isActive: false
  },
])

const chart = {
  type: "candle",
  chartData: {
    categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],   
        series: [
      {
        name: 'dada',
        data: [
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [80,90,80,80], // 第一个下限 第二个上限 第三个上影线 第四个下影线
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

const legendData = [{
  name: '<70%',
  icon: 'dangerous'
},{
  name: '70-89%',
  icon: 'warning'
},{
  name: '≥90%',
  icon: 'success'
}
]


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
  }
</style>
