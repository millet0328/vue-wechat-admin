<template>
    <div>
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="scss">
    // css公共类
    @import url("./assets/css/reset.css");
    @import url('./assets/lib/font-awesome-4.7.0/css/font-awesome.min.css');

    .title-box {
        border-bottom: 1px solid #409eff;

        h3 {
            margin-top: 0;
        }
    }
</style>
