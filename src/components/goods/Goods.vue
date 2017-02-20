<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" @click="selectMenu(index,$event)"
            :class="currentIndex == index? 'current':'menu-item'">
                    <span class="text border-1px">
                        <iconMap v-show="item.type>0" class="icon" :iconType="item.type"></iconMap>
                        {{item.name}}
                    </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="food.icon"/>
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">&yen;{{food.price}}</span><span class="old" v-show="food.oldPrice">&yen;{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol_wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopCart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopCart>
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
      .current, .menu-item {
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
      .current {
        position: relative;
        margin-top: -1px;
        z-index: 10;
        background-color: #fff;
        font-weight: 700;
        .text {
          .border-none()
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
      }
      .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        .border-1px(rgba(7, 17, 27, 0.2));
        &:last-child {
          .border-none();
          margin-bottom: 0;
        }
        .icon {
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .content {
          flex: 1;
          .name {
            margin: 2px 0 8px;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .desc, .extra {
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .desc {
            margin-bottom: 8px;
          }
          .extra {
            .count {
              margin-right: 12px;
            }
          }
          .price {
            font-weight: 700;
            line-height: 24px;
            .now {
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240, 20, 20);
            }
            .old {
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .cartcontrol_wrapper {
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import iconMap from 'components/iconMap/iconMap';
  import shopCart from 'components/shopCart/shopCart';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import axios from 'axios';
  import BScroll from 'better-scroll';
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    components: {
      iconMap,
      shopCart,
      cartcontrol
    },
    computed: {
      currentIndex(){
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
      }
    },
    methods: {
      _initScroll() {
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
      },
      selectMenu(index, $event){
        if (!$event._constructed) {
          // better-scroll touchstart，touchmove会阻止默认事件，设置了
          // click: ture 这里并不是原生的，而是better-scroll派发的事件
          // 此时在pc上就会触发两次click，解决的办法就是vue可以传入$event
          // $event原生上没有_constructed,自定义派发事件$event._constructed == true
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      }
    },
    created() {
      axios.get('api/goods').then((res) => {
        this.goods = res.data.data;
        this.$nextTick(() => {
          this._initScroll(); // 初始化scroll
          this._calculateHeight(); // 初始化列表高度列表
        });
      });
    }
  };
</script>
