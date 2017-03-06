<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <div class="title">服务态度</div>
            <star :size="36" :score="seller.serviceScore"></star>
            <div class="score">{{seller.serviceScore}}</div>
          </div>
          <div class="score-wrapper">
            <div class="title">商品评分</div>
            <star :size="36" :score="seller.foodScore"></star>
            <div class="score">{{seller.foodScore}}</div>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <ratingSelect :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingSelect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="(rating,index) in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送到</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span v-for="(item,index) in rating.recommend" class="item">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/mixin";

  .ratings {
    position: absolute;
    top: 184px;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .overview {
      display: flex;
      padding: 18px 0;
      .overview-left {
        flex: 0 0 137px;
        padding: 6px 0;
        width: 137px;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
        @media only screen and(max-width: 320px) {
          flex: 0 0 116px;
          width: 116px;
        }
        .score {
          line-height: 28px;
          margin-bottom: 6px;
          font-size: 24px;
          color: rgb(255, 153, 0);
        }
        .title {
          line-height: 12px;
          margin-bottom: 8px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .rank {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
      .overview-right {
        flex: 1;
        padding: 6px 0 6px 24px;
        @media only screen and(max-width: 320px) {
          padding-left: 6px;
        }
        .score-wrapper {
          margin-bottom: 8px;
          font-size: 0;
          > div {
            display: inline-block;
            vertical-align: top;
            line-height: 18px;
          }
          .title {
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .star {
            margin: 0 12px;
            .star-item {
              margin-right: 8px;
              &:last-child {
                margin-right: 0;
              }
            }
          }
          .score {
            font-size: 12px;
            color: rgb(255, 153, 0);
          }
        }
        .delivery-wrapper {
          font-size: 0;
          .title {
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .delivery {
            font-size: 12px;
            color: rgb(147, 153, 159);
            margin-left: 12px;
          }
        }
      }
    }
    .rating-wrapper {
      padding: 0 18px;
      .rating-item {
        display: flex;
        padding: 18px 0;
        .border-1px(rgba(7, 17, 27, 0.1));
        .avatar {
          flex: 0 0 28px;
          width: 28px;
          margin-right: 12px;
          img {
            border-radius: 50%;
          }
        }
        .content {
          position: relative;
          flex: 1;
          .name {
            margin-bottom: 4px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(7, 17, 27);
          }
          .star-wrapper {
            margin-bottom: 6px;
            font-size: 0;
            > div {
              display: inline-block;
              vertical-align: top;
            }
            .star {
              margin-right: 6px;
            }
            .delivery {
              line-height: 12px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .text {
            margin-bottom: 8px;
            line-height: 18px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .recommend {
            line-height: 16px;
            font-size: 0;
            .icon-thumb_up, .item {
              display: inline-block;
              margin: 0 8px 4px 0;
              font-size: 9px;
            }
            .icon-thumb_up {
              color: rgb(0, 160, 220);
            }
            .item {
              padding: 0 6px;
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 1px;
              color: rgb(147, 153, 159);
              background-color: #fff;
            }
          }
          .time{
            position: absolute;
            top: 0;
            right: 0;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import ratingSelect from 'components/ratingSelect/ratingSelect';
  import axios from 'axios';
  import BScroll from 'better-scroll';
  import {formatDate} from 'common/js/date';

  const POSITIVE = 0;
  const NEGTIVE = 1;
  const ALL = 2;
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      };
    },
    components: {
      star,
      ratingSelect
    },
    methods: {
      _initScroll() {
        this.ratingScroll = new BScroll(this.$refs.ratings, {
          click: true  // 防止阻止默认事件
        });
      },
      chooseType(type){
        this.selectType = type;
        this.$nextTick(() => {
          this.ratingScroll.refresh();
        });
      },
      toggleOnlyContent(showContent){
        this.onlyContent = showContent;
        this.$nextTick(() => {
          this.ratingScroll.refresh();
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
    },

    created(){
      axios.get('api/ratings').then((res) => {
        this.ratings = res.data.data;
        this.$nextTick(() => {
          this._initScroll(); // 初始化scroll
        });
      });
      this.$root.$on('ratingType.select', this.chooseType);
      this.$root.$on('content.toggle', this.toggleOnlyContent);
    },
    filters: {
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  };
</script>
