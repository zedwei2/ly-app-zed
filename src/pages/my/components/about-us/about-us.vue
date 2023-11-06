<template>
    <view class="login">
        <image src="@/static/logo.png"/> 
    </view>
    <view class="content">
  <text class="content-text">仁济医院医护端</text>
  </view>
  <view class="top-border" >
    <text class="top-name">版本号</text>
    <view class="left-info">
    <text class="top-version">{{ version }}</text>
    <image src="@/static/right-arrow.png" /> 
    </view>
 </view>
</template>

<script lang='ts' setup>
const version = 'V1.2.0'
</script>

<style scoped lang='less'>
.login{
    margin-left: 304rpx;
    margin-top: 344rpx;
    >image {
        width: 144rpx;
        height: 144rpx;
        
    }
}
.content{
    margin-top: 28rpx;
    .content-text{
    color: #242429;
      font-size: 36rpx;
      font-weight: 600rpx;
      line-height: 30rpx;
      margin-left: 250rpx;
    }
}
.top-border{
    width: 100%;
    height: 250rpx;
    display: flex;
    align-items: center;

}
.top-name{
    color:#3A3A3F ;
    font-size: 28rpx;
    font-weight: 400rpx;
    line-height: 44rpx; 
    letter-spacing: 0.2rpx;
    margin-left: 40rpx;
    }
.left-info{
    margin-left: 400rpx ;
    >image {
        width: 12rpx;
        height: 22rpx;
        margin-left: 10rpx ;
        
    }
}

.top-version{
    color: #A3A8AD;
    font-size: 14px;
    font-weight: 400;
    line-height: 44rpx; 
    letter-spacing: 0.2rpx;
    padding-left: 80rpx;
}
</style>