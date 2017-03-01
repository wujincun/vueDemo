<template>
  <div class="ratings">
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
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
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
  }
</style>
<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import ratingSelect from 'components/ratingSelect/ratingSelect';
  import axios from 'axios';
  import BScroll from 'better-scroll';

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
 /*   _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true  // 防止阻止默认事件
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,  // 防止阻止默认事件
        probeType: 3 // better-scroll中的属性，类似探针，这里为3就是记录滚动的位置
      });
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }, */
    created(){
      axios.get('api/ratings').then((res) => {
        this.ratings = res.data.data;
 /*       this.$nextTick(() => {
          this._initScroll(); // 初始化scroll
          this._calculateHeight(); // 初始化列表高度列表
        }); */
      });
    }
  };
</script>
