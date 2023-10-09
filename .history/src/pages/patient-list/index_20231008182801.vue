<template>
  <view
    class="patient-list"
    :class="warningNo === 0 ? 'common-success-bg' : 'common-warning-bg'"
  >
    <view class="top-info">
      <view class="search-input">
        <image src="@/static/patient-list/search.png" mode="scaleToFill" />
        <input
          confirm-type="search"
          placeholder="搜索患者名字"
          @confirm="onSearch"
          placeholder-style="color: #fff"
        />
      </view>
      <view class="warning-info">
        <text class="number">{{ warningNo }}</text>
        <text>当前预警人数</text>
      </view>
    </view>
    <view class="content common-content-bg">
      <view class="tab_nav">
        <view class="navTitle" v-for="(item, index) in navList" :key="index">
          <view
            :class="{ active: isActive === index }"
            @click="changeTab(index)"
          >
            {{ item.title }}({{ item.number }}人)
          </view>
        </view>
      </view>

      <view v-if="paientList.length">
        <view
          v-for="(item, index) in paientList"
          :key="index"
          class="list-item"
        >
          <view class="basic-info">
            <view class="left">
              <image
                class="touxiang"
                src="@/static/patient-list/touxiang.png"
                mode="scaleToFill"
              />
              <view>
                <text>{{ item.name }}</text>
                <text v-if="item.labels">
                  <text
                    v-for="(el, i) in item.labels"
                    :key="i"
                    class="labels"
                    >{{ el }}</text
                  >
                </text>
              </view>
            </view>
            <view class="right">
              <!-- <image
              :src="`@/static/patient-list/${
                item.isFocus ? 'focus' : 'unfocus'
              }.png`"
              mode="scaleToFill"
            /> -->
              <image
                v-if="item.isFocus"
                src="@/static/patient-list/focus.png"
                mode="scaleToFill"
              />
              <image
                v-else
                src="@/static/patient-list/unfocus.png"
                mode="scaleToFill"
              />
              <text>关注</text>
              <image
                src="@/static/patient-list/call.png"
                mode="scaleToFill"
                @click="callPhone(item.phone)"
              />
              <text>呼叫</text>
            </view>
          </view>
          <view class="health-info">
            <view class="data">
              <view v-for="(el, i) in detailList" :key="i">
                <text class="number">{{ item[el.key] }}</text>
                <text class="name">{{ el.name }}</text>
                <text class="unit">{{ el.unit }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view v-else class="empty-data">
        <image src="@/static/empty-data.png" mode="scaleToFill" />
        <text>暂无预警患者</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "",
  components: {},
  setup() {
    /**当前预警人数*/
    const warningNo = ref<number>(0);
    const isActive = ref(0),
      navList = [
        {
          index: 0,
          title: "全部患者",
          number: 12,
        },
        {
          index: 1,
          title: "关注患者",
          number: 2,
        },
        {
          index: 2,
          title: "预警患者",
          number: 0,
        },
      ];

    /**患者列表 */
    const paientList = ref([
      {
        name: "张三",
        img: "",
        //是否关注
        isFocus: false,
        //心率
        hr: 95,
        //血氧浓度
        spo: 95,
        //血压
        bp: 80,
        //收缩压
        sbp: 120,
        labels: ["心率偏高", "血压偏高"],
      },
      {
        name: "李四",
        //是否关注
        isFocus: false,
        //心率
        hr: 95,
        //血氧浓度
        spo: 95,
        //血压
        bp: 80,
        //收缩压
        sbp: 120,
      },
      {
        name: "王五",
        //是否关注
        isFocus: true,
        //心率
        hr: 95,
        //血氧浓度
        spo: 95,
        //血压
        bp: 80,
        //收缩压
        sbp: 120,
      },
      {
        name: "赵六",
        //是否关注
        isFocus: false,
        //心率
        hr: 95,
        //血氧浓度
        spo: 95,
        //血压
        bp: 80,
        //收缩压
        sbp: 120,
      },
      {
        name: "田七",
        //是否关注
        isFocus: true,
        //心率
        hr: 95,
        //血氧浓度
        spo: 95,
        //血压
        bp: 80,
        //收缩压
        sbp: 120,
      },
    ]);

    const detailList = ref([
      {
        key: "hr",
        name: "心率",
        unit: "次/分",
      },
      {
        key: "spo",
        name: "血氧浓度",
        unit: "次/分",
      },
      {
        key: "bp",
        name: "血压",
        unit: "mmol/L",
      },
      {
        key: "sbp",
        name: "收缩压",
        unit: "mmHg",
      },
    ]);

    /**名称搜索 */
    const onSearch = () => {};

    /**切换tab */
    const changeTab = (index: number) => {
      isActive.value = index;
    };

    /**拨打电话 */
    const callPhone = (mobile: string) => {
      //手机号
      const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      //座机
      const tel = /^0\d{2,3}-?\d{7,8}$/;
      if (
        mobile &&
        ((Number(mobile) === 11 && phoneReg.test(mobile)) ||
          (mobile.length == 13 &&
            mobile.indexOf("-") != -1 &&
            tel.test(mobile)))
      ) {
        uni.makePhoneCall({
          phoneNumber: mobile,
        });
      }
    };

    return {
      warningNo,
      isActive,
      navList,
      paientList,
      detailList,
      onSearch,
      changeTab,
      callPhone,
    };
  },
});
</script>

<style scoped lang="less">
.patient-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  .top-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px 16px 24px;
    color: #fff;
    margin-top: 32px;
    .search-input {
      background: rgba(236, 238, 244, 0.2);
      padding: 8px 0px;
      width: 100%;
      font-size: 14px;
      display: flex;
      align-items: center;
      > image {
        height: 14px;
        width: 14px;
        margin: 0 3px 0 12px;
      }
    }

    .warning-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 24px;
      .number {
        font-size: 40px;
        font-style: normal;
        font-weight: 700;
      }
    }
  }

  .content {
    flex: 1;
    padding: 0 16px;

    .tab_nav {
      display: flex;
      justify-content: center;
      align-items: center;
      .navTitle {
        height: 90rpx;
        line-height: 90rpx;
        width: 100%;
        text-align: center;
        color: #a3a8ad;
        font-size: 14px;
        margin-bottom: 12px;
      }
      .active {
        position: relative;
        color: #00bdc6;
        font-weight: 700;
      }
      .active::after {
        content: "";
        position: absolute;
        width: 94px;
        height: 8rpx;
        background-color: #00bdc6;
        left: 0px;
        right: 0px;
        bottom: 0px;
        margin: auto;
      }
    }

    .list-item {
      display: flex;
      flex-direction: column;
      padding: 12px 10px;
      background: #fff;
      margin-bottom: 10px;

      .basic-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 8px;
        > view {
          display: flex;
          align-items: center;
        }
        .left {
          font-size: 16px;
          font-weight: 500;
          color: #4c5056;

          > image {
            height: 30px;
            width: 30px;
            margin-right: 10px;
          }
          > view {
            display: flex;
            flex-direction: column;
            .labels {
              font-size: 10px;
              color: #ff5d63;
              font-weight: 500;
              padding: 0 3px;
              border: solid 1px #ff5d63;
              border-radius: 3px;
              margin-right: 8px;
            }
          }
        }
        .right {
          font-size: 11px;
          font-weight: 400;
          color: #4c5056;
          > image {
            height: 18px;
            width: 18px;
            margin-right: 3px;
          }
          > text:not(:last-child) {
            margin-right: 16px;
          }
        }
      }
      .health-info {
        .data {
          display: flex;
          justify-content: space-around;
          background: #f5f5f9;
          padding: 8px 10px;

          > view {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .number {
              font-size: 20px;
              color: rgba(0, 29, 69, 0.9);
              font-weight: 700;
            }
            .name {
              font-size: 12px;
              color: #4c5056;
              font-weight: 400;
            }
            .unit {
              color: #a3a8ad;
              font-size: 10px;
              font-weight: 400;
            }
          }
        }
      }
    }

    .empty-data {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #000;
      font-weight: 400;
      > image {
        width: 138px;
        height: 112px;
        margin-bottom: 13px;
      }
    }
  }
}
</style>
