<template>
  <view class="custom-select">
    <view @click="isSelectShow = !isSelectShow">
      <text>{{ selectRange[selectedItem] }}</text>
      <van-icon name="arrow-down" v-if="isSelectShow" />
      <van-icon name="arrow-up" v-else />
    </view>

    <view class="select-content" v-if="isSelectShow">
      <text
        v-for="(key, value) of selectRange"
        :key="value"
        @click="selectDate(value)"
        >{{ key }}</text
      >
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  selectedItem: {
    type: String,
    default: "",
  },
  selectRange: {
    type: Object,
    default: [],
  },
});

const emit = defineEmits(["onSelectChange"]);

const isSelectShow = ref<boolean>(false);

/**
 * 下拉选择时间
 * @param item 选择的时间
 */
const selectDate = (item: any) => {
  isSelectShow.value = false;
  emit("onSelectChange", item);
};
</script>

<style lang="less" scoped>
.custom-select {
  position: relative;
  color: #4c5056;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 22px; /* 157.143% */
  margin: 0 12rpx;
  .select-content {
    z-index: 99;
    position: absolute;
    top: 45rpx;
    left: -30rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    box-shadow: 0px 1px 4px 3px rgba(0, 0, 0, 0.1);
    border-radius: 8rpx;

    text {
      text-align: center;
      width: 140rpx;
      padding: 6rpx 10rpx;
      z-index: 999;
    }
  }
}
</style>
