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
        <div class="favorite">
          <span class="icon-favorite" :class="{'active':favorite}" @click="toggleFavorite"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
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
      <div class="divider"></div>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90" alt="">
            </li>
          </ul>
        </div>
      </div>
      <div class="divider"></div>
      <div class="info">
        <div class="title">商家信息</div>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
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
      position: relative;
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
      .favorite {
        position: absolute;
        right: 11px;
        top: 18px;
        text-align: center;
        width: 50px;
        .icon-favorite {
          display: block;
          margin-bottom: 4px;
          line-height: 24px;
          font-size: 24px;
          color: #d4d6d9;
          &.active {
            color: rgb(240, 20, 20);
          }
        }
        .text {
          line-height: 10px;
          font-size: 10px;
          color: #4d555d;
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
          &:last-child {
            border: none;
          }
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
    .pics {
      padding: 8px;
      .title {
        margin-bottom: 12px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .pic-wrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list {
          font-size: 0;
          .pic-item {
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;
            &:last-child {
              margin: 0;
            }
          }
        }
      }
    }
    .info {
      padding: 18px 18px 0 18px;
      color: rgb(7, 17, 27);
      .title {
        padding-bottom: 12px;
        .border-1px(rgba(7, 17, 27, 0.1));
        line-height: 14px;
        font-size: 14px;
      }
      .info-item {
        padding: 16px 12px;
        line-height: 16px;
        .border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
        &:last-child {
          border: none;
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {saveToLocal, loadFromLocal} from 'common/js/store';
  import star from 'components/star/star';
  import iconMap from 'components/iconMap/iconMap';
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    components: {
      star,
      iconMap
    },
    computed: {
      favoriteText(){
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    created() {
      this.iconClassMap = ['decrease', 'special', 'discount', 'invoice', 'guarantee'];
    },
    updated(){
      this._initScroll();
      this._picScroll();
    },
    mounted () {
      this.$nextTick(function () {
        // 代码保证 this.$el 在 document 中
        this._initScroll();
        this._picScroll();
      });
    },
    methods: {
      toggleFavorite(event){
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      },
      _initScroll(){
        if (!this.sellerScroll) {
          this.sellerScroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          // 未取到数据,所以不能滚动
          this.sellerScroll.refresh();
        }
      },
      _picScroll(){
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 60;
          let width = (picWidth + margin) * (this.seller.pics.length - 1) - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical' // 忽略垂直方向上的滚动
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      }
    }
  };
</script>
