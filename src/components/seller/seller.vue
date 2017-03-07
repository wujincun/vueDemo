<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <div class="stress">{{seller.minPrice}}<span>元</span></div>
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <div class="stress">{{seller.deliveryPrice}}<span>元</span></div>
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <div class="stress">{{seller.deliveryTime}}<span>分钟</span></div>
            </div>
          </li>
        </ul>
      </div>
      <div class="divider"></div>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="item in seller.supports">
            <iconMap :iconType="item.type"></iconMap>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import '../../common/less/mixin';

  .seller {
    position: absolute;
    top: 184px;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .overview {
      padding: 18px;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .desc {
        padding-bottom: 18px;
        .border-1px(rgba(7, 17, 27, 0.1));
        font-size: 0;
        .star {
          display: inline-block;
          margin-right: 8px;
          vertical-align: top;
        }
        .text {
          display: inline-block;
          margin-right: 12px;
          line-height: 18px;
          vertical-align: top;
          font-size: 10px;
          color: reb(77, 85, 93);
        }
      }
      .remark {
        display: flex;
        padding-top: 18px;
        .block {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          &:last-child {
            border: none;
          }
          h2 {
            margin-bottom: 4px;
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .content {
            line-height: 24px;
            font-size: 10px;
            color: rgb(7, 17, 27);
            .stress {
              font-size: 20px;
              span {
                font-size: 10px;
              }
            }
          }
        }
      }
    }
    .bulletin {
      padding: 18px 18px 0 18px;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .content-wrapper {
        padding: 0 12px 16px 12px;
        .border-1px(rgba(7, 17, 27, 0.1));
        .content {
          line-height: 24px;
          font-size: 12px;
          color: rgb(240, 20, 20);
        }
      }
      .supports {
        .support-item {
          padding: 16px 12px;
          .border-1px(rgba(7, 17, 27, 0.1));
          font-size: 0;
          .iconMap {
            width: 16px;
            height: 16px;
            vertical-align: top;
            margin-right: 6px;
          }
          .text {
            line-height: 16px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import star from 'components/star/star';
  import iconMap from 'components/iconMap/iconMap';
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {};
    },
    components: {
      star,
      iconMap
    },
    created() {
      this.iconClassMap = ['decrease', 'special', 'discount', 'invoice', 'guarantee'];
    },
    ready(){
      this.sellerScroll = new BScroll(this.$refs.seller, {
        click: true
      });
    },
    methods: {
      _initScroll(){
        this.sellerScroll = new BScroll(this.$refs.seller, {
          click: true
        });
      }
    }
  };
</script>
