<template>
  <view class="statictis common-page common-success-bg">
    <view class="basic-info">
      <view>
        <text class="title title1">全部患者/人</text>
        <text class="warn number">{{ staticInfo.totalNo }}</text>
      </view>
      <view>
        <text class="title title2">预警患者/人</text>
        <text class="number">{{ staticInfo.warningNo }}</text>
      </view>
    </view>
    <view class="chart-content patient-distribution">
      <text class="title">患者分布</text>
      <view>
        <canvas
          canvas-id="f2-chart"
          id="myChart"
          width="100%"
          height="260"
          ref="myChart"
        ></canvas>
      </view>
      <view></view>
      <view></view>
      <view></view>
    </view>
    <view class="chart-content trend">
      <text class="title">患者趋势</text>
      <text class="title">因素分析</text>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, nextTick } from "vue";
import { Chart } from "@antv/f2";
// import "@antv/f2/lib/theme.js";

export default defineComponent({
  name: "",
  components: {},
  setup() {
    const staticInfo = {
      totalNo: 12,
      warningNo: 2,
    };

    // const myChart = ref(null);
    const drawChart = () => {
      let dom = document.getElementById("myChart");
      console.log(dom, "myChart====");
      // 创建F2实例并绘制环形图
      const chart = new Chart({
        el: dom,
        pixelRatio: uni.getSystemInfoSync().pixelRatio,
      }); // 设置图表主题
      return;
      // 假设您有一个示例数据数组，例如：
      const data = [
        { name: "A", value: 100 },
        { name: "B", value: 200 },
        { name: "C", value: 150 },
      ];

      chart.source(data);

      chart.coord("polar", {
        transposed: true,
        innerRadius: 0.6,
        radius: 0.85,
      });

      chart.axis(false); // 关闭坐标轴
      chart.legend(false);

      chart.tooltip({
        showTitle: false,
        showCrosshairs: false,
      });

      chart.interval().position("name*value").style({
        lineWidth: 1,
        stroke: "#fff",
      });

      // 设置图表主题
      chart.theme({
        defaultColor: "#FF6B3B",
        geometries: {
          interval: {
            rect: {
              radius: [4, 4, 0, 0],
            },
          },
        },
      });

      chart.render();
    };

    onMounted(() => {
      nextTick(() => {
        drawChart();
      });
    });

    return {
      staticInfo,
    };
  },
});
</script>

<style scoped lang="scss">
.statictis {
  padding: 10px 16px;
  .basic-info {
    display: flex;
    justify-content: space-around;
    > view:not(:last-child) {
      margin-right: 10px;
    }
    > view {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 12px 14px;
      border-radius: 4px;
      width: 100%;
      background: #fff;
      .title {
        font-weight: 500;
        font-size: 12px;
        color: #4c5056;
      }
      .title1 {
        &::before {
          display: inline-block;
          position: relative;
          top: 0;
          margin-right: 6px;
          border-radius: 2px;
          width: 4px;
          height: 10px;
          background: #007bff;
          content: '';
        }
      }
      .title2 {
        &::before {
          display: inline-block;
          position: relative;
          top: 0;
          margin-right: 6px;
          border-radius: 2px;
          width: 4px;
          height: 10px;
          background: #ff4141;
          content: '';
        }
      }
      .number {
        padding-left: 9px;
        padding-top: 9px;
        line-height: 22px;
        font-weight: 700;
        font-size: 22px;
        color: rgba(0, 29, 69, 0.9);
      }
    }
  }
  .chart-content {
    margin-top: 10px;
    padding: 12px;
    border-radius: 4px;
    background: #fff;
    .title {
      line-height: 26px; /* 162.5% */
      font-weight: 500;
      font-size: 16px;
      color: #242429;
    }
  }
}
</style>
