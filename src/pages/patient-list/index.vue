<template>
  <view
    class="patient-list"
    :class="isActive !== 2 ? 'common-success-bg' : 'common-warning-bg'"
  >
    <view class="top-info">
      <view class="search-input">
        <image src="~@/static/patient-list/search.png" mode="scaleToFill" />
        <input
          confirm-type="search"
          placeholder="搜索患者名字"
          v-model="searchName"
          @keyup.13="filertData"
          @confirm="filertData"
          placeholder-style="color: #fff"
        />
      </view>
      <view class="warning-info">
        <text class="number">{{ warningPatientTotal }}</text>
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

      <scroll-view
        v-if="paientList.length"
        :style="'height: calc(100vh - ' + 500 + 'rpx);'"
        scroll-y="true"
        @scrolltolower="getMore"
      >
        <view
          v-for="(item, index) in paientList"
          :key="index"
          class="list-item"
        >
          <view class="basic-info">
            <view class="left">
              <image
                class="touxiang"
                :src="
                  item.photo
                    ? imgBaseUrl + item.photo
                    : global.default.portraitUrl
                "
                mode="scaleToFill"
              />
              <view>
                <text>{{ item.PatientName }}</text>
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
              <FocusCall :patientInfo="item" @handleFocus="handleFocus" />
            </view>
          </view>
          <view class="health-info" @click="goToDetail(item)">
            <view class="data">
              <view v-for="(el, i) in detailList" :key="i">
                <view>
                  <text class="number">{{ item[el.key] || "--" }}</text>
                  <text class="unit">{{ el.unit }}</text>
                </view>
                <text class="name">{{ el.name }}</text>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>

      <view v-else class="empty-data">
        <image src="@/static/empty-data.png" mode="scaleToFill" />
        <text>暂无数据</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { onShow, onHide, onReady } from "@dcloudio/uni-app";

import twinsService from "@/api/twins-service";
import FocusCall from "@/components/focus-call/index.vue";
import { forward } from "@/utils/router";
import global from "@/utils/global";

const modelCode = "MyocardialInfarctionRevision";
const imgBaseUrl = global.urls.fileUrl;
/**当前预警人数*/
const warningPatientTotal = ref<number>(0);
const isActive = ref(0),
  navList = ref([
    {
      index: 0,
      title: "全部患者",
      number: 12,
      key: "patientTotal",
    },
    {
      index: 1,
      title: "关注患者",
      number: 2,
      key: "subscriberCount",
    },
    {
      index: 2,
      title: "预警患者",
      number: 0,
      key: "warningPatientTotal",
    },
  ]);

/**患者列表 */
const paientList = ref([]);

const detailList = reactive([
  {
    key: "HeartRate",
    name: "心率",
    unit: "次/分",
  },
  {
    key: "SpO2",
    name: "血氧浓度",
    unit: "次/分",
  },
  {
    key: "BloodPressure",
    name: "血压",
    unit: "mmol/L",
  },
  {
    key: "RespiratoryRate",
    name: "呼吸频率",
    unit: "次/分",
  },
  {
    key: "BloodSugar",
    name: "血糖",
    unit: "mmHg",
  },
]);

const searchName = ref("");
/** 表格数据 */
const tableData = ref([]),
  /** 表格分页信息 */
  pagination = { current: 1, pageSize: 999, total: 0 };
/** 查询表格数据 */
const onQuery = (filters?: any[]) => {
  twinsService
    .getTwinsIns({
      modelCode: modelCode,
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      propertyFilters: filters,
    })
    .then((res) => {
      const data = (res as any)?.data;
      if (data.data) {
        paientList.value = data.data;
        pagination.total = data.totalCount;
      } else {
        paientList.value = [];
        pagination.total = 0;
      }
    })
    .finally(() => {});
};

/**查询患者统计数据
 * @returns
 */
const queryData = () => {
  twinsService
    .queryPatientStatic()
    .then((res: any) => {
      warningPatientTotal.value = res.data.warningPatientTotal;
      navList.value.forEach((item) => {
        item.number = res.data[item.key];
      });
    })
    .catch((err: any) => {});
};

const filertData = () => {
  let filters = [];
  if (searchName.value) {
    filters.push({
      propertyCode: "PatientName",
      propertyType: "LIKE",
      propertyValue: searchName.value,
    });
  }
  if (isActive.value === 1) {
    //查询关注列表
    filters.push({
      propertyCode: "Subscriber",
      propertyType: "IN",
      propertyValue: 1,
    });
  } else if (isActive.value === 2) {
    //查询预警列表
    filters.push({
      propertyCode: "Warning",
      propertyValue: null,
      propertyType: "NOT_EMPTY_ARRAY",
    });
  }
  onQuery(filters);
};
/**切换tab */
const changeTab = (index: number) => {
  if (isActive.value === index) return;
  isActive.value = index;
  filertData();
};

const goToDetail = (item: any) => {
  forward("patient-detail", { id: item.index });
};

const getMore = () => {
  console.log("到底部了~,待后续做分页处理");
};

/**关注/取消关注 */
const handleFocus = (info: any) => {
  if (info.isCancel) {
    twinsService
      .getUnsubscribe(info.id)
      .then((res) => {
        onQuery();
      })
      .catch((err) => {});
  } else {
    twinsService
      .getSubscribe(info.id)
      .then((res) => {
        onQuery();
      })
      .catch((err) => {});
  }
};

onShow(() => {
  onQuery();
  queryData();
});
</script>

<style scoped lang="less">
.patient-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: hidden;
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
          // background: #f5f5f9;
          padding: 16rpx 20rpx;
          border-radius: 8rpx;

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
              color: #a3a8ad;
              font-weight: 400;
            }
            .unit {
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
