<template>
    <div class="container">
        <!-- 隐私声明 -->
        <view class="title">
            <text>隐私声明</text>
        </view>
        <pre class="wrapped-text">{{ state.text }}</pre>
    </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive } from 'vue';

export default defineComponent({
    setup() {
        const state = reactive({
            text: "文本文件内容"
        });
        onMounted(async () => {
            try {
                const response = await fetch("/src/assets/file/隐私声明v1.0.txt");
                const data = await response.text();
                state.text = data;
            } catch (error) {
                console.error("获取文本文件内容时出错：", error);
            }
        });

        return {
            state,
        }
    },
})
</script>

<style scoped lang='less'>
.wrapped-text {
    margin-top: 20px;
    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap;
    padding: 0 30px;
}

.title {
    text-align: center;
    font-weight: bold;
}
</style>