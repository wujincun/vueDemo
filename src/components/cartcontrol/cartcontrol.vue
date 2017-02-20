<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count" @click="decreaseCart"></div>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  .cartcontrol {
    font-size: 0;
    > div {
      display: inline-block;
    }
    .cart-decrease, .cart-add {
      padding: 6px;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0, 160, 220);
    }
    .cart-count {
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }
  }
</style>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default{
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {};
    },
    created() {
    },
    methods: {
      addCart(event){
        if (!event._constructed) {
          return;
        }
        this.food.count ? this.food.count++ : Vue.set(this.food, 'count', 1);
      },
      decreaseCart(event){
        if (!event._constructed) {
          return;
        }
        this.food.count && this.food.count--;
      }
    }
  };
</script>
