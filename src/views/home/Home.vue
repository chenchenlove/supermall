<template>
  <div class="home">
    <nav-bar class="nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"/>
    <home-recommend-view :recommends="recommends" />
    <weekday-view/>
    <tab-control :titles="['流行','新款','精选']" />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl'

import HomeSwiper from './homecomponents/HomeSwiper'
import HomeRecommendView from './homecomponents/HomeRecommendView'
import WeekdayView from './homecomponents/WeekdayView'

import {getHomeMultidata} from 'network/home.js';

  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      WeekdayView,
      TabControl
    },
    data(){
      return {
        banners:[],
        recommends:[]
      }
    },
    created() {
      getHomeMultidata().then(res => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
  }
</script>

<style lang="scss" scoped>
.home{
  padding-top: 44px;;
  .nav-bar{
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
}
</style>
