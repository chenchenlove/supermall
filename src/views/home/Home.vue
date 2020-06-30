<template>
  <div class="home">
    <nav-bar class="nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 这里加一个tabcontrol主要为了做吸顶效果 -->
    <tab-control :titles="['流行','新款','精选']" @clickitem="clickItem" ref="tabcontrol1" :class="{tabcontrolshow:isShowTabcontrol}" v-if="showBar"/>
    <scroll class="content" ref="scroll" @contentScroll="contentscroll" :probe-type="3" :pull-up-load="true" @pullingUp="pullingUp">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommends="recommends" />
      <weekday-view />
      <tab-control :titles="['流行','新款','精选']" @clickitem="clickItem" ref="tabcontrol2"/>
      <goods-list :goodsData="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="clickBackTop" class="back-top" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backtop/BackTop";

import HomeSwiper from "./homecomponents/HomeSwiper";
import HomeRecommendView from "./homecomponents/HomeRecommendView";
import WeekdayView from "./homecomponents/WeekdayView";

import { getHomeMultidata, getHomeGoods } from "network/home.js";
import { debunce } from "assets/js/common.js";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    WeekdayView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop:false,
      tabOffset:0,
      isShowTabcontrol:false,
      showBar:true,
      saveY:0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    getHomeMultidata().then(res => {
      console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
    this.getGoods("pop");
    this.getGoods("new");
    this.getGoods("sell");
  },
  mounted(){
    //防抖函数  减少请求次数  减轻服务压力
    const refresh = debunce(this.$refs.scroll.refresh,50)
    this.$bus.$on('itemImageLoad',()=>{
      // this.$refs.scroll.refresh()
      refresh()
    })
  },
  methods: {
    getGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        //将数据一个一个push到数据中
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //调用此方法，告诉scroll介绍上拉了
        this.$refs.scroll.finishPullUp()
        console.log(res, "++++++");
      });
    },
    clickItem(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      console.log(this.$refs.tabcontrol2.currentIndex,index)
      this.$refs.tabcontrol1.currentIndex = index;
      this.$refs.tabcontrol2.currentIndex = index;
    },
    clickBackTop(){//回到顶部
      this.$refs.scroll.scrollTo(0,0)
    },
    swiperImageLoad(){//banner图片加载
    //所有的组件都有一个属性$el:用于获取组件中的元素其中offsetTop获取具体顶部的偏移量
      this.tabOffset = this.$refs.tabcontrol2.$el.offsetTop;
    },
    //监听bscroll的滑动
    contentscroll(position){
      //当y大于1000时显示backtop
      this.isShowBackTop = (-position.y) > 1000
      //当大于offset的时候显示
      this.isShowTabcontrol = (-position.y) > this.tabOffset

      this.showBar = (-position.y) >= 0
    },
    pullingUp(){
      this.getGoods(this.currentType)
    },
  },
  activated(){
    console.log('activated',this.saveY)
    //进入时滑动位置
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    //最好做一次刷新操作
    // this.$refs.scroll.refresh()
  },
  deactivated(){
    //退出时保存当前位置
    this.saveY = this.$refs.scroll.getScrollY()
    console.log('deactivated',this.saveY)
  },
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  height: 100vh;//viewheight当前视口高度 100%
  .nav-bar {
    background-color: var(--color-tint);
    color: white;
    //BScroll可以设置区域滚动，所以可以不用脱标，可以取消fixed，主要是为了做tabcontrol的吸顶效果
    // position: fixed;
    // left: 0;
    // right: 0;
    // top: 0;
    // z-index: 9;
  }
  .tabcontrolshow{
    position: relative;
    z-index: 9;
  }
  .content{
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .back-top{
    position: fixed;
    bottom: 51px;
    right: 8px;
    z-index: 10;
  }
  //这种方式也可以设置scroll占据中间部分
  // .content{
  //   height: calc(100% -93px);
  //   overflow: hidden;
  //   margin-top: 44px;
  // }
}
</style>
