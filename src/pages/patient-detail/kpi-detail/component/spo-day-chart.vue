<template>
   <view class="hr-chart">
      <view class="hr-chart-title">平均血氧<text>98%</text></view>
      <qiun-data-charts 
        type="column"
        :opts="chart.opts"
        :chartData="chart.chartData"
      />

      <view
        class="custom-xaxis"
        >
        <text 
          v-for="item in xAxisData"
          :key="item">{{ item }}</text>
      </view>
      <tipLegend :tipData="legendData"/>

    </view>
</template>

<script lang="ts" setup>
import tipLegend from './tip-legend.vue'
const getData = () => {
  var arr: any = [];
  var q = 1597910400000;
  for (var i = 1; i < 100; i += 15) {
    arr.push([q - i * 3600 * 1000, Math.random() * 5 + 80]);
    q = q - i * 3600 * 1000;
  }
  return arr;
};
const chart = {
  chartData: {
    categories: getData().map((item: any) => {
      return item[0];
    }),
    series: [
      {
        name: "血氧饱和度",
        data: getData().map((item: any) => {
          return item[1];
        }),
      },
    ],
  },
  opts: {
    color: ["#45DDE1","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
    padding: [15,4,10,4],
    dataLabel: false,
    dataPointShape: false,
    legend: {
      show: false
    },
    xAxis: {
      disabled: true,
      disableGrid: true,
      format: "xAxisDemo2",
      boundaryGap: "justify",
      fontColor: '#92969A',
      axisLine: false,
    },
    yAxis: {
      gridType: "dash",
      dashLength: 2,
      data: [
        {
          fontColor: '#92969A',
          format: "yAxisDemo1",
          min: 0,
          max: 100
        }
      ]
    },
    extra: {
      column: {
        type: "group",
        width: 6,
        activeBgColor: "#09CCD5",
        activeBgOpacity: 0.08,
        seriesGap: 1000,
        barBorderCircle: true,
      },
      tooltip: {
        showBox: false,
        splitLine: true, 
        gridColor: '#FDDEDE',
      },
    }
  }
};

const xAxisData = ['00:00', '06:00', '12:00', '18:00', '24:00']
const legendData = [{
  name: '<70%',
  icon: 'dangerous'
},{
  name: '70-89%',
  icon: 'warning'
},{
  name: '≥90%',
  icon: 'success'
},{
  name: '有较低血氧(或高反风险）',
  icon: 'tips'
}
]

</script>

<style lang="less">
 .hr-chart {
    border: 2rpx solid #E9EEF0;
    padding: 32rpx 10rpx 20rpx 0;
    border-radius: 20rpx;
    .hr-chart-title {
      color: #4C5056;
      font-size: 28rpx;
      line-height: 44rpx; 
      text-align: center;
      margin-bottom: 16rpx;
      text {
        color:rgba(0, 29, 69, 0.90);
        font-size: 60rpx;
        font-weight: 700;
        line-height: 72rpx; 
        margin-left: 20rpx;
      }
    }
    .custom-xaxis {
      display: flex;
      margin-left: 60rpx;
      justify-content: space-around;
      color:#92969A;
      font-size: 24rpx;
      font-weight: 500;
      line-height: 40rpx; /* 166.667% */
    }
  }
</style>
