<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.acm">
        <a :href="item.link">
          <img :src="item.image" alt @load="swiperImageLoad"/>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data(){
    return {
      isLoad:false
    }
  },
  methods:{
    swiperImageLoad(){
      //我们只需要知道图片加载一次就可以了，因为我只需要拿到图片当前的offset就可以了
      if (!this.isLoad) {
        this.$emit("swiperImageLoad")
        this.isLoad = !this.isLoad
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>