<template>
    <span class="iconMap" :class="iconClassMap[iconType]"></span>
</template>
<style lang="less" rel="stylesheet/less">
    @import 'mixin.less';
    .iconMap {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: contain;
        background-repeat: no-repeat;
        &.decrease {
            .bg-image('decrease_4')
        }
        &.discount {
            .bg-image('discount_4')
        }
        &.guarantee {
            .bg-image('guarantee_4')
        }
        &.invoice {
            .bg-image('invoice_4')
        }
        &.special {
            .bg-image('special_4')
        }
    }

</style>
<script type="text/ecmascript-6">
    export default{
        props: {
            iconType: {
                type: Number
            }
        },
        data () {
            return {};
        },
        created() {
            this.iconClassMap = ['decrease', 'special', 'discount', 'invoice', 'guarantee'];
        }
    };
</script>
