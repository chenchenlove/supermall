<template>
    <div>
        <detail-navi-bar></detail-navi-bar>
        <detail-swiper :top-images="topImages"/>
    </div>
</template>
<script>
import DetailNaviBar from './detialComponents/DetailNaviBar'
import DetailSwiper from './detialComponents/DetailSwiper'

import {getDetailInformation} from 'network/detail'
export default {
    name:'Detail',
    components:{
        DetailNaviBar,
        DetailSwiper
    },
    data(){
        return {
            iid:null,
            topImages:[]
        }
    },
    created(){
        this.iid = this.$route.params.iid

        getDetailInformation(this.iid).then(res=>{
            this.topImages = res.result.itemInfo.topImages
            console.log(res,this.topImages)
        })
        
        // console.log(this.iid)
    }
}
</script>
<style lang="scss" scoped>

</style>