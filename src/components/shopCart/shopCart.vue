<template>
  <div>
    <div class="shopCart">
      <div class="content">
        <div class="content-left" @click="toggleList">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalCount}">
              <i class="icon-shopping_cart"></i>
            </div>
            <div class="num" v-show="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight': totalPrice}">&yen;{{totalPrice}}</div>
          <div class="desc">另需配送费&yen;{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click="pay">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <transition name="drop" v-for="(ball,index) in balls"
                    v-on:before-enter="beforeEnter" v-on:enter="enter"
                    v-on:after-enter="afterEnter">
          <div v-show="ball.show" class="ball">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
      <transition name="fold">
        <div class="shoCartList" v-show="listShow">
          <div class="list_header">
            <div class="title">购物车</div>
            <div class="empty" @click="empty">清空</div>
          </div>
          <div class="list_content" ref="foodlist">
            <ul>
              <li class="food" v-for="(food,index) in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol_wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/mixin.less";

  .shopCart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content {
      display: flex;
      background: #141d27;
      color: rgba(255, 255, 255, 0.4);
      .content-left {
        flex: 1;
        font-size: 0;
        > div {
          display: inline-block;
        }
        .logo-wrapper {
          position: relative;
          vertical-align: top;
          top: -10px;
          margin: 0 12px;
          padding: 6px;
          height: 56px;
          width: 56px;
          box-sizing: border-box;
          border-radius: 50%;
          background-color: #141d27;
          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            text-align: center;
            background-color: #2b343c;
            .icon-shopping_cart {
              font-size: 24px;
              line-height: 44px;
              color: #80858a;
            }
            &.highlight {
              background-color: rgb(0, 160, 220);
              .icon-shopping_cart {
                color: #fff;
              }
            }
          }
          .num {
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 400;
            color: #fff;
            background-color: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
          }
        }
        .price {
          vertical-align: top;
          line-height: 24px;
          margin-top: 12px;
          box-sizing: border-box;
          padding-right: 12px;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 16px;
          font-weight: 700;
          &.highlight {
            color: #fff;
          }
        }
        .desc {
          vertical-align: top;
          line-height: 24px;
          margin: 12px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 10px;
        }
      }
      .content-right {
        flex: 0 0 105px;
        width: 105px;
        .pay {
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          &.not-enough {
            background-color: #2b333b;
          }
          &.enough {
            background-color: #00b43c;
            color: #fff;
          }
        }
      }
    }
    .ball-container {
      .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
        }
        &.drop-enter, &.drop-enter-active {
          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
          .inner {
            transition: all 0.4s linear;
          }
        }
      }
    }
    .shoCartList {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      transform: translate3d(0, -100%, 0);
      &.fold-enter-active, &.fold-leave-active {
        transition: all 0.5s;
      }
      &.fold-enter, &.fold-leave-active {
        transform: translate3d(0, 0, 0);
      }
      .list_header {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background-color: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title {
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .empty {
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .list_content {
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        background-color: #fff;
        .food {
          position: relative;
          padding: 12px 0;
          .border-1px(rgba(7, 17, 27, 0.1));
          .name {
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .price {
            position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 20px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }
          .cartcontrol_wrapper {
            position: absolute;
            right: 0;
            bottom: 6px;
          }
        }
      }
    }
  }

  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    background-color: rgba(7, 17, 27, 0.6);
    -webkit-backdrop-filter: blur(10px);
    &.fade-enter-active, &.fade-leave-active {
      transition: opacity 0.5s;
    }
    &.fade-enter, &.fade-leave-active {
      opacity: 0;
    }
  }
</style>
<script type="text/ecmascript-6">
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import BScroll from 'better-scroll';

  export default{
    props: {
      selectFoods: {
        type: Array
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        listShow: false
      };
    },
    components: {
      cartcontrol
    },
    created() {
      this.$root.$on('cart.add', this.drop);
    },
    computed: {
      cartListShow(){
        if (this.listShow && this.totalPrice) {
          return true;
        }
        this.listShow = false;
        return false;
      },
      totalPrice(){
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount(){
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc(){
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass(){
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      }
    },
    methods: {
      drop(el) {
        for (let i = 0, l = this.balls.length; i < l; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      toggleList(){
        if (this.selectFoods.length) {
          this.listShow = !this.listShow;
          if (this.listShow) {
            this.$nextTick(() => {
              if (!this.foodlistScroll) {
                this._initScroll();
              } else {
                this.foodlistScroll.refresh();
              }
            });
          }
        }
      },
      _initScroll(){
        this.foodlistScroll = new BScroll(this.$refs.foodlist, {
          click: true
        });
      },
      empty(){
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      hideList(){
        this.listShow = false;
      },
      pay(){
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`支付${this.totalPrice}元`);
      },
      beforeEnter(el){
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.dispaly = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.querySelector('.inner-hook');
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter(el){
        /* 手动触发浏览器重绘,vue的动画实现需要重绘，重绘后设置transform才有用 */
        el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.querySelector('.inner-hook');
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
      },
      afterEnter(el){
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    }
  };
</script>
