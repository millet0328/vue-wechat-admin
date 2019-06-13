<template>
    <div class="title-box am-margin-bottom-lg">
        <h3 class="title">{{text}}</h3>
    </div>
</template>

<script>
    export default {
        name: "Title",
        props: ['text'],
    }
</script>

<style lang="scss" scoped>
    .title-box {
        border-bottom: 1px solid #409eff;

        h3 {
            margin-top: 0;
        }
    }
</style>