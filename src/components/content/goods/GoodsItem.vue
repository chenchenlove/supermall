<template>
    <div class="goods-item" @click="clickGoods">
        <img :src="goodsItemData.show.img" alt="" @load="imageLoad">
        <div class="goods-item-info">
            <p>{{goodsItemData.title}}</p>
            <span class="price">{{goodsItemData.price}}</span>
            <span class="collect">{{goodsItemData.cfav}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        goodsItemData:{
            type: Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        imageLoad(){//图片加载完就会调用此函数   此函数主要是联动主页图片加载完成之后刷新bscroll 重新计算contentHeight
            this.$bus.$emit('itemImageLoad')
        },
        clickGoods(){//点击进入详情
            this.$router.push('/detail/'+this.goodsItemData.iid)
        }
    }
}
</script>
<style lang="scss" scoped>
.goods-item{
    position: relative;
    padding-bottom: 40px;
    width: 48%;
    img {
        width: 100%;
        border-radius: 5px;
    }
    &-info{
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
        p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-right: 3px;
        }
        .price{
            color: var(--color-high-text);
            margin-right: 20px;
        }
        .collect {
            position: relative;
        }
        .collect::before{
            content: '';
            position: absolute;
            left: -15px;
            top: -1px;
            width: 14px;
            height: 14px;
            background: url('~assets/images/common/collect.svg') 0 0/14px 14px;
        }
    }
}
</style>