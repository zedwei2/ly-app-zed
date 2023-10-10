<script setup lang="ts">
/**
 * 定义传入组件的参数
 */
defineProps({
  isFocus: {  // 是否关注
    type: Boolean,
    default: false
  },
  phone: {   // 电话号码
    type: String,
    default: ''
  }
});

/**
 * 拨打电话
 * @param mobile 
 */
const callPhone = (mobile: string) => {
  // 手机号
  const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
  // 座机
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

</script>

<template>
  <view class="focus-call-wrapper">
    <image
      v-if="isFocus"
      src="@/static/patient-list/focus.png"
      mode="scaleToFill"
    />
    <image
      v-else
      src="@/static/patient-list/unfocus.png"
      mode="scaleToFill"
    />
    <view>关注</view>
    <image
      src="@/static/patient-list/call.png"
      mode="scaleToFill"
      @click="callPhone(phone)"
    />
    <view>呼叫</view>
  </view>
</template>

<style scoped lang="scss">
  .focus-call-wrapper {
    display: flex;
    font-size: 22rpx;
    color: #4c5056;
    > image {
      margin-right: 8rpx;
      width: 36rpx;
      height: 36rpx;
    }
    > uni-view:not(:last-child) {
      margin-right: 32rpx;
    }
  }
</style>
