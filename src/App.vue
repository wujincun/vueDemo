<template>
  <div id="wrapper">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import {urlParse} from 'common/js/utils';
  import header from './components/header/header.vue';
  import axios from 'axios';
  export default {
    name: 'app',
    data () {
      return {
        seller: {
          id: (() => {
            return urlParse('id');
          })()
        }
      };
    },
    created() {
      axios.get('api/seller?id=' + this.seller.id).then((res) => {
        this.seller = Object.assign({}, this.seller, res.data.data);
      }).catch(function (error) {
        console.log(error);
      });
    },
    components: {
      'v-header': header
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/index.styl"
  #wrapper
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          color: rgb(77, 85, 93)
          font-size: 14px
          &.active
            color: rgb(240, 20, 20)


</style>

