<script>
import { mapGetters } from 'vuex';
//import worksData from '../assets/data/worksData.json';
export default {
    name: 'works',
    data() {
        return {
            loading: true,
            //worksData: worksData,
            worksData: [
                {
                    "classification": null,
                    "listingPageImg1": null//,
                    /*"listingPageImg2": null,
                    "constructionName": null,
                    "popupCoverImg": null,
                    "descriptionTitle": null,
                    "description": null,
                    "introduction": null,
                    "popupBannerGroup": [],
                    "designConcept": null,
                    "popupEndCoverImgGroup": [],
                    "endText": null*/
                }
            ],
            isWorkShow: "All",
            isWorkSwitching: null,
            showFirstLoadWork: 0
        }
    },
    computed: {
        ...mapGetters([
            'isMobile',
            'getScrollTop'
        ]),
        worksDataLength(){
            return this.worksData.length || 0
        }
    },
    methods: {
        changeWorksShow(val){
            this.isWorkSwitching = 'hideing'
            setTimeout(()=>{
                this.isWorkShow = val
            },500)
            setTimeout(()=>{
                this.isWorkSwitching = 'showing'
            },550)
            setTimeout(()=>{
                this.isWorkSwitching = null
            },1050)
        },
        scrollToTop() {
            setTimeout(() => {
                window.scrollTo(0,0);
            }, 200);
        },
        getDomOffset(){
            var scrollTop;
            var windowHeight;
            //var showFirstLoadWork = 0;
            setTimeout(()=>{
                //const { work1 } = this.$refs
                //console.dir(work1[0].offsetTop)

                const { worksMainScreenArea } = this.$refs
                //console.dir(worksMainScreenArea.clientHeight)
                for(var i=0;i<this.worksDataLength;i++){
                    //console.dir(this.$refs['work'+i][0])
                    //console.dir(this.$refs.work[0].dataset.work)
                    //console.dir(worksMainScreenArea.clientHeight+this.$refs['work'+i][0].offsetTop)
                    var supplementPrevHeightN = (this.isMobile ? 1:2)
                    if(i>=supplementPrevHeightN){
                        this.$refs['work'+i][0].dataset.offset = (worksMainScreenArea.clientHeight + this.$refs['work'+(i-1)][0].offsetHeight) + this.$refs['work'+i][0].offsetTop
                    }else{
                        this.$refs['work'+i][0].dataset.offset = worksMainScreenArea.clientHeight + this.$refs['work'+i][0].offsetTop
                    }

                    /*if(showFirstLoadWork < 2 && this.$refs['work'+i][0].classList.contains("selected")){
                        this.$refs['work'+i][0].classList.add("on")
                        showFirstLoadWork++
                    }*/
                }
                //由於動畫時間0.5s 後才渲染至畫面，所以要0.51s後才能正確抓到offsettop
            },510)
            setTimeout(()=>{
                this.showFirstLoadWork = 0
                this.postDomFirstAndSecondOn()
            },1100)
            
            /*document.querySelectorAll(".selected").forEach(element => {
                console.log(showFirstLoadWork)
                
                if(showFirstLoadWork < 2){
                    console.log(element)
                    element.classList.add("on")
                    showFirstLoadWork++
                }
            })*/
        },
        postDomFirstAndSecondOn(){
            var showNumber = (this.isMobile ? 1:2)
            for(var i=0;i<this.worksDataLength;i++){
                if(this.showFirstLoadWork == showNumber) break;
                if(this.$refs['work'+i][0].classList.contains("selected")){
                    this.$refs['work'+i][0].classList.add("on")
                    this.showFirstLoadWork++
                }
            }
        }
    },
    watch: {
        getScrollTop(val) {
            val = val-100;

            for(var i=0;i<this.worksDataLength;i++){
                if(val >= this.$refs['work'+i][0].dataset.offset && !this.$refs['work'+i][0].classList.contains("on")){
                    this.$refs['work'+i][0].classList.add("on")
                }
            }
        }
    },
    created(){
        this.$axios.get('./assets/data/worksData.json').then((response) => {
            this.worksData = response.data;
        })
        .catch((error)=> {
            console.log("!ERROR: Ajax homeData.json fail: ",error)
        })
        .then(()=> {

            const { _loading } = this.$refs
            const timeline = new TimelineLite()
            timeline.to(_loading, 0.3, {autoAlpha: 0})
                    .add(()=>{ this.loading=false })
        })
    },
    mounted(){
        //Banner animated (tweenMax)
        const { title } = this.$refs
        const { subTitle } = this.$refs
        const { description } = this.$refs
        const { select } = this.$refs
        const timeline = new TimelineLite()
        timeline.from(title, 0.5, {opacity: 0, x: -30, delay: 0.3})
                .from([subTitle,description], 0.5, {opacity: 0, y: -10})
                .from(select, 0.5, {opacity: 0})

        //Set v-for created work dom data-offset number
        this.getDomOffset()
    },
    beforeDestroy(){
        
    }
}
</script>

<template>
    <div class="worksPage firstDom">
        <div class="_loading" ref="_loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
        <!-- Works main screen -->
        <div class="worksMainScreenArea pagesTopCover" ref="worksMainScreenArea">
            <div>
                <h1 ref="title">WORKS</h1>
                <h2 ref="subTitle">型隨機能。</h2>
                <p ref="description">
                    設計是理性的； 想法是感性的。<br>
                    空間本身就是故事，無需雕琢更不用華麗語彙，<br>
                    我們的設計以人為核心，溫柔保護內在空間的舒適與安全，<br>
                    以生活場所與自然棲所，滋養豐富居住者的每一日。
                </p>
                <div class="classificationMenu" ref="select">
                    <ul>
                        <li>
                            <a href="javascript:;" 
                               :class="{active:isWorkShow==='All'}" 
                               @click="changeWorksShow('All'); getDomOffset();">ALL</a>
                        </li>
                        <li>
                            <a href="javascript:;" 
                               :class="{active:isWorkShow==='Commercial'}" 
                               @click="changeWorksShow('Commercial'); getDomOffset();">COMMERCIAL</a>
                        </li>
                        <li>
                            <a href="javascript:;" 
                               :class="{active:isWorkShow==='Interiors'}" 
                               @click="changeWorksShow('Interiors'); getDomOffset();">INTERIORS</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Works -->
        <div class="worksArea">
            <div class="topGrey"></div>
            <div class="worksContent">
                <div class="movingDownFirst"
                     v-for="(item,index) in worksData"
                     :key="index"
                     v-show="isWorkShow==='All' || isWorkShow===item.classification"
                     :class="{hideing:isWorkSwitching==='hideing',
                              showing:isWorkSwitching==='showing',
                              selected:isWorkShow==='All' || isWorkShow===item.classification}"
                     :ref="'work'+index">
                    <router-link :to="'work/'+index"
                                 @click.native="scrollToTop">
                        <!-- 目前用CSS 做成黑白照片，之後確認後 json listingPageImg2要刪掉 -->
                        <img :src="item.listingPageImg1" class="picOpposite">
                        <img :src="item.listingPageImg1" class="pic">
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "../scss/helpers/_mixin.scss";
    @import "../scss/helpers/scrollAnimation.scss";
    @import "../scss/pages/_works.scss";
</style>