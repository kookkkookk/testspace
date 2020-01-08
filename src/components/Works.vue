<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'works',
    data() {
        return {
            isWorkSwitching: null,
            showFirstLoadWork: 0,
            isShowTopBtn: false,
            isTopBtnUp: false
        }
    },
    computed: {
        ...mapGetters([
            'isMobile',
            'documentHeight',
            'getScrollTop',
            'getWork_isWorkShow',
            'stateWorkPageData'
        ]),
        worksDataLength(){
            return this.stateWorkPageData.length || 0
        }
    },
    methods: {
        ...mapActions([
            'getWorkPageData'
        ]),
        changeWorksShow(val){
            this.isWorkSwitching = 'hideing'
            setTimeout(()=>{
                this.$store.dispatch('postWork_isWorkShowVal', val);
            },500)
            setTimeout(()=>{
                this.isWorkSwitching = 'showing'
            },550)
            setTimeout(()=>{
                this.$aos.refreshHard();
            },1050)
        },
        scrollToTop() {
            setTimeout(() => {
                window.scrollTo(0,0);
            }, 200);
        }
    },
    watch: {
        getScrollTop(val) {
            if(val>=(this.documentHeight+200)){
                this.isShowTopBtn = true;
            }else{
                this.isShowTopBtn = false;
            }

            if(val >= document.getElementById("app").offsetHeight - 100){
                this.isTopBtnUp = true;
            }else{
                this.isTopBtnUp = false;
            }
        }
    },
    created(){
        this.getWorkPageData().then(()=>{
            this.$store.dispatch('runFadeOutLoading', true);
        });
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

        //scroll anumated api
        this.$aos.init()
        this.$aos.init({
            duration: 500,
            once: true
        })
    },
    beforeDestroy(){
    }
}
</script>

<template>
    <div class="worksPage firstDom">
        <!-- Works main screen -->
        <div class="worksMainScreenArea pagesTopCover" ref="worksMainScreenArea">
            <div>
                <h1 ref="title">WORKS</h1>
                <h2 ref="subTitle" v-if="!isMobile">型隨機能。</h2>
                <h2 ref="subTitle" v-else>型隨機能</h2>
                <p ref="description" v-if="!isMobile">
                    設計是理性的； 想法是感性的。<br>
                    空間本身就是故事，無需雕琢更不用華麗語彙，<br>
                    我們的設計以人為核心，溫柔保護內在空間的舒適與安全，<br>
                    以生活場所與自然棲所，滋養豐富居住者的每一日。
                </p>
                <div class="classificationMenu" ref="select">
                    <ul>
                        <li>
                            <a href="javascript:;" 
                               :class="{active:getWork_isWorkShow==='All'}" 
                               @click="changeWorksShow('All')">ALL</a>
                        </li>
                        <li>
                            <a href="javascript:;" 
                               :class="{active:getWork_isWorkShow==='Commercial'}" 
                               @click="changeWorksShow('Commercial')">COMMERCIAL</a>
                        </li>
                        <li>
                            <a href="javascript:;" 
                               :class="{active:getWork_isWorkShow==='Interiors'}" 
                               @click="changeWorksShow('Interiors')">INTERIORS</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Works -->
        <div class="worksArea">
            <div class="topGrey"></div>
            <div class="worksContent">
                <div data-aos="fade-down"
                     v-for="(item,index) in stateWorkPageData"
                     :key="index"
                     v-show="getWork_isWorkShow==='All' || getWork_isWorkShow===item.classification"
                     :class="{hideing:isWorkSwitching==='hideing',
                              showing:isWorkSwitching==='showing',
                              selected:getWork_isWorkShow==='All' || getWork_isWorkShow===item.classification,
                              long:item.listingLong}"
                     :ref="'work'+index">
                    <router-link :to="'work/'+index"
                                 @click.native="scrollToTop">
                        <img :src="item.listingPageImg1" class="picOpposite">
                        <img :src="item.listingPageImg1" class="pic">
                    </router-link>
                </div>
            </div>
        </div>

        <div class="topBtn"
             v-scroll-to="'body'"
             :class="{topBtnShow:isShowTopBtn, up:isTopBtnUp}"
             v-if="!isMobile">
            <span></span>
        </div>
        
        <div v-else
             class="topBtnMobile"
             v-scroll-to="'body'"
             :class="{topBtnShow:isShowTopBtn, up:isTopBtnUp}">
            <span></span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "scss/helpers/_mixin.scss";
    // @import "scss/helpers/_scrollAnimation.scss";
    @import "scss/pages/_works.scss";
</style>