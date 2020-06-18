<template>
    <div class="recommend">
        <div class="recommend-item" v-for="item in recommends" :key="item.acm">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.recommend{
    width: 100%;
    text-align: center;
    display: flex;
    font-size: 14px;
    padding: 10px 0 20px 0;
    border-bottom: 10px solid #eee;
    &-item{
        flex: 1;
        img {
            width: 70px;
            height: 70px;
            margin-bottom: 5px;
        }
    }
}
</style>