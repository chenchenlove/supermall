<template>
    <div class="tab-control">
        <div class="tab-control-item" v-for="(item,index) in titles" :key="index" :class="{active:index === currentIndex}" @click="clickItem(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        titles:{
            type: Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            currentIndex:0
        }
    },
    methods:{
        clickItem(index){
            this.currentIndex = index;
            this.$emit('clickitem',index);
        }
    }
}
</script>
<style lang="scss" scoped>
.tab-control{
    display: flex;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #fff;
    &-item{
        flex: 1;
        span{
            padding: 5px;
        }
    }
    .active {
        color: var(--color-tint);
        span {
            border-bottom: 3px solid var(--color-tint);
        }
    }
    
}
</style>