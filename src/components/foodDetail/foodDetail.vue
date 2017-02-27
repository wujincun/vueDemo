<template>
  <transition name="move">
    <div class="detailWrapper" v-show="showFoodDetail" ref="detailWrapper">
      <div class="foodDetail">
        <div class="image-header">
          <div class="back" @click="showToggle()">
            <i class="icon-arrow_lift"></i>
          </div>
          <img :src="food.image">
        </div>
        <div class="info">
          <div class="title">{{food.name}}</div>
          <div class="desc">
            <span>月售{{food.sellCount}}</span>
            <span>好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="unit">￥</span>{{food.price}}
            <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cart_wrapper">
            <transition name="fade">
              <div class="firstAddCart" @click="firstAddCart($event)" v-show="!food.count">加入购物车</div>
            </transition>
            <div class="cartcontrol_wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </div>
        </div>
        <div class="desc_wrapper" v-show="food.info">
          <div class="divider"></div>
          <div class="desc">
            <div class="title">商品介绍</div>
            <div class="content">{{food.info}}</div>
          </div>
        </div>
        <div class="evaluation_wrapper">
          <div class="divider"></div>
          <div class="evaluation">
            <div class="title">
              商品评价
            </div>
            <ratingSelect :selectType="selectType" :onlyContent="onlyContent" :desc="desc"
                          :ratings="food.ratings"></ratingSelect>
            <div class="rating-wrapper">
              <ul v-show="food.ratings && food.ratings.length" >
                <li v-for="(rating,index) in food.ratings" class="rating-item"  v-show="needShow(rating.rateType,rating.text)">
                  <div class="user">
                    <span class="userName">{{rating.username}}</span>
                    <img :src="rating.avatar" alt="rating.avatar" class="avatar" width="12" height="12">
                  </div>
                  <div class="time">{{rating.rateTime}}</div>
                  <p class="text">
                    <span
                      :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>
                    {{rating.text}}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评论</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/mixin";

  .detailWrapper {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background-color: #fff;
    transform: translate3d(0, 0, 0);
    &.move-enter-active, &.move-leave-active {
      transition: all 0.2s linear;
    }
    &.move-enter, &.move-leave-active {
      transform: translate3d(100%, 0, 0);
    }
    .foodDetail {
      .image-header {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
      }
      .back {
        position: absolute;
        top: 12px;
        left: 6px;
        z-index: 10;
        .icon-arrow_lift {
          display: block;
          color: white;
          font-size: 20px;
          padding: 10px;
        }
      }
      .info {
        position: relative;
        width: 100%;
        padding: 18px;
        .title {
          font-size: 14px;
          font-weight: 700;
          color: rgb(7, 17, 27);
          line-height: 14px;
        }
        .desc {
          display: flex;
          padding: 0;
          padding-top: 8px;
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 10px;
          span:last-child {
            padding-left: 12px;
          }
        }
        .price {
          display: flex;
          padding-top: 18px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
          line-height: 24px;
          .unit {
            font-size: 10px;
            font-weight: normal;
          }
          .oldPrice {
            padding-left: 12px;
            font-size: 10px;
            font-weight: normal;
            color: rgb(147, 153, 159);
            line-height: 24px;
            text-decoration: line-through;
          }

        }
        .cart_wrapper {
          position: absolute;
          right: 16px;
          bottom: 24px;
          width: 84px;
          height: 24px;
          text-align: center;
          z-index: 2;
          .firstAddCart {
            position: relative;
            margin-top: 6px;
            height: 100%;
            line-height: 24px;
            color: white;
            font-size: 10px;
            padding: 0 12px;
            border-radius: 12px;
            background: rgb(0, 160, 220);
            z-index: 20;
            &.fade-enter-active, &.fade-leave-active {
              transition: opacity .5s
            }
            &.fade-enter, &.fade-leave-active {
              opacity: 0
            }
          }
          .cartcontrol_wrapper {
            position: absolute;
            left: 0;
            top: 0;
          }
        }

      }
      .desc {
        padding: 18px;
        .title {
          font-size: 14px;
          font-weight: 500;
          color: #07111b;
          margin-bottom: 6px;
        }
        .content {
          font-size: 12px;
          font-weight: 200;
          color: rgb(77, 85, 93);
          line-height: 24px;
          padding: 0 8px;
        }
      }
      .evaluation {
        padding: 18px 0;
        position: relative;
        .title {
          padding-left: 18px;
          font-size: 14px;
          font-weight: 500;
          color: #07111b;
        }
        .rating-wrapper {
          padding: 0 18px;
          .rating-item {
            position: relative;
            padding: 16px 0;
            .border-1px(rgba(7, 17, .27, 0.1));
            .user {
              position: absolute;
              right: 0;
              top: 16px;
              line-height: 12px;
              font-size: 0;
              .userName {
                display: inline-block;
                margin-right: 6px;
                vertical-align: top;
                font-size: 10px;
                color: rgb(147, 153, 159);
              }
              .avatar {
                border-radius: 50%;
              }
            }
            .time {
              margin-bottom: 6px;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
            .text {
              line-height: 16px;
              font-size: 12px;
              color: rgb(7, 17, 27);
              .icon-thumb_up, .icon-thumb_down {
                line-height: 16px;
                margin-right: 4px;
                font-size: 12px;
              }
              .icon-thumb_up {
                color: rgb(0, 160, 220);
              }
              .icon-thumb_down {
                color: rgb(147, 153, 159);
              }
            }
          }
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import ratingSelect from 'components/ratingSelect/ratingSelect';
  import BScroll from 'better-scroll';

  const POSITIVE = 0;
  const NEGTIVE = 1;
  const ALL = 2;
  export default{
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFoodDetail: false,
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    components: {
      cartcontrol,
      ratingSelect
    },
    created() {
      this.$root.$on('ratingType.select', this.chooseType);
      this.$root.$on('content.toggle', this.toggleOnlyContent);
    },
    methods: {
      showToggle(){
        this.showFoodDetail = !this.showFoodDetail;
        if (this.showFoodDetail) {
          this.selectType = ALL;
          this.onlyContent = false;
          this.$nextTick(() => {
            if (!this.detailWrapperScroll) {
              this._initScroll();
            } else {
              this.detailWrapperScroll.refresh();
            }
          });
        }
      },
      _initScroll(){
        this.detailWrapperScroll = new BScroll(this.$refs.detailWrapper, {
          click: true
        });
      },
      firstAddCart($event){
        if (!$event._constructed) {
          return;
        }
        this.$set(this.food, 'count', 1);
        this.$root.$emit('cart.add', event.target);
      },
      chooseType(type){
        this.selectType = type;
        this.$nextTick(() => {
          this.detailWrapperScroll.refresh();
        });
      },
      toggleOnlyContent(showContent){
        this.onlyContent = showContent;
        this.$nextTick(() => {
          this.detailWrapperScroll.refresh();
        });
      },
      needShow(type, text){
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    }
  };
</script>
