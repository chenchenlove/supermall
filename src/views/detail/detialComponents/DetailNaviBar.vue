<template>
    <div class="detail-nav-bar">
        <nav-bar>
            <img slot="left" src="~assets/images/common/back.svg" alt="" class="detail-nav-bar-left" @click="clickBack">
            <div slot="center" class="detail-nav-bar-content">
                <div v-for="(item,index) in titles" :key="index" @click="clickItem(index)" :class="{active:currentIndex==index}" class="detail-nav-bar-center">{{item}}</div>
            </div>
        </nav-bar>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    components:{
        NavBar
    },
    data(){
        return {
            titles:["商品","参数","评论","推荐"],
            currentIndex:0
        }
    },
    methods:{
        clickBack(){
            this.$router.back()
        },
        clickItem(index){
            this.currentIndex = index
        }
    }
}
</script>
<style lang="scss" scoped>
.detail-nav-bar{
    &-left {
        margin-top: 10px;
    }
    &-content {
        display: flex;
    }
    &-center {
        flex: 1;
    }
    .active{
        color: var(--color-high-text);
    }
}
</style>