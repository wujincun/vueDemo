<template>
  <div class="cartcontrol">
    <transition name="fadeRotate">
      <div class="cart-decrease " v-show="food.count" @click.stop.prevent="decreaseCart">
        <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  .cartcontrol {
    font-size: 0;
    > div {
      display: inline-block;
    }
    .cart-decrease {
      padding: 6px;
      transition: all 0.4s linear;
      .inner {
        font-size: 24px;
        line-height: 24px;
        color: rgb(0, 160, 220);
        transition: all 0.4s linear;
      }
      &.fadeRotate-enter-active, &.fadeRotate-leave-active {
        transform: translate3d(0, 0, 0);
        .inner {
          display: inline-block;
          transform: rotate(0);
        }
      }
      &.fadeRotate-enter, &.fadeRotate-leave-active {
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        .inner {
          transform: rotate(180deg);
        }
      }
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
    .cart-add {
      padding: 6px;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0, 160, 220);
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
        this.$store.addCartEl = event.target;
        // vm.$root 当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自已。
        this.$root.$emit('cart.add', event.target);
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
