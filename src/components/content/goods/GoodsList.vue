<template>
    <div class="goods-list">
        <goods-item v-for="item in goodsData" :key="item.acm" :goodsItemData="item"></goods-item>
    </div>
</template>
<script>
import GoodsItem from  './GoodsItem'
export default {
    components:{
        GoodsItem
    },
    props:{
        goodsData:{
            type: Array,
            default(){
                return []
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
}
</style>