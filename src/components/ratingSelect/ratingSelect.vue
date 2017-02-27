<template>
  <div class="ratingSelect">
    <div class="rating-type">
      <span @click="select(2,$event)" class="block positive" :class="{'active':type === 2}">{{desc.all}}
        <span class="count">{{this.ratings.length}}</span>
      </span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':type === 0}">{{desc.positive}}
        <span class="count">{{this.positives.length}}</span>
      </span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':type === 1}">{{desc.negative}}
        <span class="count">{{this.negatives.length}}</span>
      </span>
    </div>
    <div @click="toggleContent($event)" class="switch" :class="{'on':showContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/mixin";

  .ratingSelect {
    .rating-type {
      padding: 18px 0;
      margin: 0 18px;
      .border-1px(rgba(7, 17, 27, 0.1));
      font-size: 0;
      .block {
        display: inline-block;
        padding: 8px 12px;
        border-radius: 1px;
        margin-right: 8px;
        color: rgb(77, 85, 93);
        font-size: 12px;
        line-height: 16px;
        &.active {
          color: #fff;
        }
        .count {
          margin-left: 2px;
          line-height: 16px;
          font-size: 8px;
        }
        &.positive {
          background-color: rgba(0, 160, 220, 0.2);
          &.active {
            background-color: rgb(0, 160, 220);
          }
        }
        &.negative {
          background-color: rgba(77, 85, 93, 0.2);
          &.active {
            background-color: rgb(77, 85, 93);
          }
        }
      }
    }
    .switch {
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      color: rgb(147, 153, 159);
      font-size: 0;
      .icon-check_circle {
        margin-right: 4px;
        font-size: 24px;
      }
      .text {
        vertical-align: top;
        font-size: 12px;
      }
      &.on{
        .icon-check_circle {
          color: #00a0dc;
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGTIVE = 1;
  const ALL = 2;
  export default{
    props: {
      ratings: {
        type: Array,
        default(){
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default(){
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    data () {
      return {
        type: this.selectType,
        showContent: this.onlyContent
      };
    },
    computed: {
      positives(){
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives(){
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGTIVE;
        });
      }
    },
    methods: {
      select(type, $event){
        if (!$event._constructed) {
          return;
        }
        this.type = type;
        this.$root.$emit('ratingType.select', this.type);
      },
      toggleContent($event){
        if (!$event._constructed) {
          return;
        }
        this.showContent = !this.showContent;
        this.$root.$emit('content.toggle', this.showContent);
      }
    }

  };
</script>
