<template>
  <view
    class="patient-list"
    :class="warningNo === 0 ? 'common-success-bg' : 'common-warning-bg'"
  >
    <view class="top-info">
      <view class="search-input">
        <image src="~@/static/patient-list/search.png" mode="scaleToFill" />
        <input
          confirm-type="search"
          placeholder="搜索患者名字"
          v-model="searchName"
          @keyup.13="onSearch"
          @input="onSearch"
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
          @click="goToDetail(item)"
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
              /> -->
              <image
                v-if="item.isFocus"
                src="@/static/patient-list/focus.png"
              />
              <image v-else src="@/static/patient-list/unfocus.png" />
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

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { forward } from "@/utils/router";

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

const detailList = reactive([
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

const searchName = ref("");

/**名称搜索 */
const onSearch = (val: string) => {
  paientList.value = [];
};

/**切换tab */
const changeTab = (index: number) => {
  isActive.value = index;
};

const goToDetail = (item: any) => {
  forward("patient-detail", { id: item.index });
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
      (mobile.length == 13 && mobile.indexOf("-") != -1 && tel.test(mobile)))
  ) {
    uni.makePhoneCall({
      phoneNumber: mobile,
    });
  }
};
</script>

<style scoped lang="less">
.patient-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  .top-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24rpx 32rpx 48rpx;
    color: #fff;
    margin-top: 64rpx;
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
      padding-top: 48rpx;
      .number {
        font-size: 80rpx;
        font-style: normal;
        font-weight: 700;
      }
    }
  }

  .content {
    flex: 1;
    padding: 0 32rpx;

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
        font-size: 28rpx;
        margin-bottom: 24rpx;
      }
      .active {
        position: relative;
        color: #00bdc6;
        font-weight: 700;
      }
      .active::after {
        content: "";
        position: absolute;
        width: 188rpx;
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
      padding: 24rpx 20rpx;
      background: #fff;
      margin-bottom: 20rpx;

      .basic-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 16rpx;
        > view {
          display: flex;
          align-items: center;
        }
        .left {
          font-size: 32rpx;
          font-weight: 500;
          color: #4c5056;

          > image {
            height: 60rpx;
            width: 60rpx;
            margin-right: 20rpx;
          }
          > view {
            display: flex;
            flex-direction: column;
            .labels {
              font-size: 20rpx;
              color: #ff5d63;
              font-weight: 500;
              padding: 0 6rpx;
              border: solid 2rpx #ff5d63;
              border-radius: 6rpx;
              margin-right: 16rpx;
            }
          }
        }
        .right {
          font-size: 22rpx;
          font-weight: 400;
          color: #4c5056;
          > image {
            height: 36rpx;
            width: 36rpx;
            margin-right: 6rpx;
          }
          > text:not(:last-child) {
            margin-right: 32rpx;
          }
        }
      }
      .health-info {
        .data {
          display: flex;
          justify-content: space-around;
          background: #f5f5f9;
          padding: 16rpx 20rpx;

          > view {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .number {
              font-size: 40rpx;
              color: rgba(0, 29, 69, 0.9);
              font-weight: 700;
            }
            .name {
              font-size: 24rpx;
              color: #4c5056;
              font-weight: 400;
            }
            .unit {
              color: #a3a8ad;
              font-size: 20rpx;
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
      font-size: 28rpx;
      color: #000;
      font-weight: 400;
      > image {
        width: 276rpx;
        height: 224rpx;
        margin-bottom: 26rpx;
      }
    }
  }
}
</style>
