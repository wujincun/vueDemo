<template>
    <div class="goods">
        <div class="menu-wrapper">
            <ul>
                <li v-for="item in goods" class="menu-item">
                    <span class="text border-1px">
                        <iconMap v-show="item.type>0" class="icon" :iconType="item.type"></iconMap>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper">
            <div class="test"></div>
        </div>
    </div>

</template>
<style lang="less" rel="stylesheet/less">
    @import '../../common/less/mixin.less';

    .goods {
        display: flex;
        position: absolute;
        width: 100%;
        top: 184px;
        bottom: 46px;
        overflow: hidden;
        .menu-wrapper {
            flex: 0 0 80px;
            width: 80px;
            background: #f3f5f7;
            .menu-item {
                display: table;
                width: 56px;
                height: 54px;
                line-height: 14px;
                padding: 0 12px;
                .text {
                    display: table-cell;
                    width: 56px;
                    vertical-align: middle;
                    font-size: 12px;
                    .border-1px(rgba(7, 17, 27, 0.2))
                }
            }
        }
        .foods-wrapper {
            flex: 1;
            .test {
                height: 56px;
                border-bottom: 1px solid rgba(7, 17, 27, 0.2);
            }
        }
    }
</style>
<script type="text/ecmascript-6">
    import iconMap from 'components/iconMap/iconMap';
    import axios from 'axios';
    export default{
        props: {
            seller: {
                type: Object
            }
        },
        components: {
            iconMap
        },
        data () {
            return {
                goods: []
            };
        },

        created() {
            axios.get('static/data.json').then((res) => {
                this.goods = res.data.goods;
                /* this.$nextTick(() => {
                 this._initScroll(); // 初始化scroll
                 this._calculateHeight(); // 初始化列表高度列表
                 }); */
            });
        }
    };
</script>
