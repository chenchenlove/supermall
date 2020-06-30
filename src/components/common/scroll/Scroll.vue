<template>
    <div class="scroll" ref="wrapper">
        <div class="scroll-content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    props:{
        probeType:{
            type: Number,
            default:1
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            bscroll:null
        }
    },
    mounted(){
        this.bscroll = new BScroll(this.$refs.wrapper,{
            click:true,//当bscroll中有div img等添加事件的时候，如果不设置为true是不会响应的
            probeType: this.probeType,//0，1默认不监听滚动事件,2滚动监听事件  3放手之后事件还会被监听
            pullUpLoad: this.pullUpLoad
        }),
        this.bscroll.on('scroll',(position)=>{//实时监听视图滚动 'scroll'是官方定义的字段
            this.$emit('contentScroll',position);
        })
        this.bscroll.on('pullingUp',()=>{//上拉事件
            this.$emit('pullingUp')
        })
    },
    methods:{
        scrollTo(x,y,time=300){//滚动到指定位置
            this.bscroll && this.bscroll.scrollTo(x,y,time);
        },
        finishPullUp(){//停止刷新 
            this.bscroll && this.bscroll.finishPullUp();
        },
        refresh(){//刷新scroll 重新计算contentHeight  否则会出现卡顿现象
            this.bscroll && this.bscroll.refresh()//逻辑与运算  保证bscroll存在才去调用方法
            console.log('111111111')
        },
        getScrollY(){
            return this.bscroll ? this.bscroll.y : 0
        }
    }
}
</script>
<style lang="scss" scoped>

</style>