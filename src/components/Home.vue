<script>
import { mapGetters } from 'vuex';
import homeData from '../assets/data/homeData.json';

import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
var timer, interval = 5000;
export default {
    name: 'home',
    data() {
        return {
            swiperOption: {
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    renderBullet(index, className) {
                        return `<span class="${className} swiper-pagination-bullet-custom">${index + 1}</span>`
                    }
                }
            },
            active: 0,
            homeData: homeData,
            el_chair: 0,
            el_styleLife_h1: 0,
            el_styleLife_pic: 0,
            el_styleLife_p: 0,
            el_schematically_bg: 0
        }
    },
    computed: {
        ...mapGetters([
            'isMobile',
            'documentHeight',
            'getScrollTop'
        ]),
        total() {
            return this.homeData[1].bannerDesktopImg.length || 0
        }
    },
    methods: {
        clickBanner(active){
            this.active = (active + this.total) % this.total
            this.clearHandler()
            this.setHandler();
        },
        nextHandler() {
            this.active = (this.active + 1) % this.homeData[1].bannerDesktopImg.length
        },
        setHandler() {
            this.clearHandler()
            timer = setInterval(this.nextHandler, interval)
        },
        clearHandler() {
            clearInterval(timer)
        },
        //Get el offsetTop
        getDomOffset() {
            setTimeout(()=>{
                this.el_chair = document.querySelector('.chairArea').offsetTop
                this.el_styleLife_h1 = document.querySelector('.lifeStyleArea h1').offsetTop
                this.el_styleLife_pic = document.querySelector('.lifeStyleArea .pic').offsetTop
                this.el_styleLife_p = document.querySelector('.lifeStyleArea p').offsetTop
                this.el_schematically_bg = document.querySelector('.schematically').offsetTop

                //由於該el已經被position 所以offsetTop重置，要先抓父層再相加
                //this.el_schematically_TextBox = document.querySelector('.schematically').offsetTop + document.querySelector('.schematically .description').offsetTop
            },100)
        }
    },
    components: {
        swiper,
        swiperSlide
    },
    watch: {
        //Scroll > el offsetTop el animated's Fn
        getScrollTop(val) {
            val = val-100;
            if(val >= this.el_chair && !document.querySelector(".chairArea").classList.contains("on")){
                document.querySelector('.chairArea').classList.add("on")
                console.log(this.isMobile)
                if(!this.isMobile){
                    document.querySelector('.left').classList.add("on")
                    document.querySelector('.left p').classList.add("on")
                    document.querySelector('.right').classList.add("on")
                    document.querySelector('.right p').classList.add("on")
                    document.querySelector('.right h2').classList.add("on")
                }else{
                    document.querySelector('.bg img').classList.add("on")
                    document.querySelector('.description').classList.add("on")
                    document.querySelector('.description p').classList.add("on")
                }
            }
            if(val >= this.el_styleLife_h1 && !document.querySelector(".lifeStyleArea h1").classList.contains("on")){
                document.querySelector('.lifeStyleArea h1').classList.add("on")
            }
            if(val >= this.el_styleLife_pic && !document.querySelector(".lifeStyleArea .pic").classList.contains("on")){
                document.querySelector('.lifeStyleArea .pic').classList.add("on")
            }
            if(val >= this.el_styleLife_p && !document.querySelector(".lifeStyleArea p").classList.contains("on")){
                document.querySelector('.lifeStyleArea p').classList.add("on")
            }
            if(val >= this.el_schematically_bg && !document.querySelector(".schematically .bg").classList.contains("on")){
                document.querySelector('.schematically .bg').classList.add("on")
                document.querySelector('.schematically .description').classList.add("on")
            }
            //if(val >= this.el_schematically_TextBox && !document.querySelector(".schematically .description").classList.contains("on")){
            //    document.querySelector('.schematically .description').classList.add("on")
            //}
        }
    },
    created() {
        this.setHandler();
    },
    mounted(){
        this.getDomOffset();
        
        //Banner animated (tweenMax)
        const { bannerDom } = this.$refs
        const { titleArea } = this.$refs
        const timeline = new TimelineLite()
        timeline.from(bannerDom, 0.5, {scale:1.1, opacity: 0})
                .from(titleArea, 0.5, {scale:1.1, opacity: 0})
        
    },
    destroyed () {

    }
}
</script>

<template>
    <div class="homePage firstDom">
        <!-- Banner -->
        <div class="bannerArea">
            
            <div class="bannerContainer"
                 :style="[!isMobile?{height:documentHeight+'px'}:{height:'auto'}]"
                 ref="bannerDom">
                <span class="braceHeight">
                    <!-- <img v-if="!isMobile" src="~Home/00_banner_desktop00_braceHeight.jpg">
                    <img v-else src="~Home/00_banner_mobile00_braceHeight.jpg"> -->
                    <img v-if="isMobile" src="~Home/00_banner_mobile00_braceHeight.jpg">
                </span>
                <transition-group v-if="!isMobile"
                                  tag="div"
                                  name="fade"
                                  @click.native="clickBanner(active+1)">
                    <!-- <img v-for="(item, index) in homeData[1].bannerDesktopImg"
                         :key="item"
                         :src="item"
                         v-show="active===index"/> -->
                         <div class="bannerPic"
                              v-for="(item, index) in homeData[1].bannerDesktopImg"
                              :key="index"
                              :style="{backgroundImage:'url('+item+')'}"
                              v-show="active===index"></div>
                </transition-group>

                <swiper v-else
                        :options="swiperOption"
                        class="mobileBanner">
                    <swiper-slide v-for="(item, index) in homeData[1].bannerMobileImg"
                                  :key="index">
                        <img :src="item">
                    </swiper-slide>
                    <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
                </swiper>
            </div>
            <div class="titleArea" ref="titleArea">
                <div>
                    <h1>{{homeData[0].bannerTitle}}</h1>
                    <h2>{{homeData[0].bannerSubTitle}}</h2>
                </div>
            </div>
            <div v-if="!isMobile" class="mouseIcon">
                <div>
                    <span></span>
                </div>
            </div>
            
        </div>

        <!-- Chair -->
        <div class="chairArea" ref="chairArea">
            <div class="bg">
                <img v-if="!isMobile" src="~Home/01_chairBg_desktop.png">
                <img v-else src="~Home/01_chair_mobile.png" class="movingOpacity">
            </div>
            <div class="movingLevelLeft" :class="{left:!isMobile,description:isMobile}">
                <p class="movingLevelLeft movingDelay2">
                    風格是什麼？歲月、生活、經典...<br>
                    空間是什麼？人的尺度，光影的彩度，空間的溫度。<br>
                    家是什麼？ 心之所向就是家。
                </p>
            </div>
            <div v-if="!isMobile" class="right movingLevel">
                <p class="movingDownFirst movingDelay1">自在與優雅，空間意念的詮釋</p>
                <h2 class="movingDownFirst movingDelay1">ZITONSPACE</h2>
            </div>
            <!-- <div v-if="!isMobile" class="titleArea"></div>
            <div v-if="!isMobile" class="leftChair"></div>
            <div v-if="!isMobile" class="rightChair"></div>
            <div class="description">
                <p v-if="isMobile">
                    風格是什麼？歲月、生活、經典...<br>
                    空間是什麼？人的尺度，光影的彩度，空間的溫度。<br>
                    家是什麼？ 心之所向就是家。
                </p>
            </div> -->
        </div>

        <!-- Life style -->
        <div class="lifeStyleArea">
            <div>
                <h1 class="movingLevel">LIFE STYLE</h1>
                <div class="pic movingVertical"><img src="~Home/02_schematically.jpg"></div>
                <p class="movingVertical">
                    「有時我很想畫風景，就好像有人很想通過長時間散步來緩解心情一樣。<br>
                    在自然當中，比如樹木中，我可以看見情感與靈魂。」<br>
                    <span>—梵谷，19世紀荷蘭後印象派畫家—</span>
                </p>
            </div>
        </div>

        <!-- Schematically -->
        <div class="schematically">
            <div v-if="!isMobile" class="bg picDesktop movingOpacity"></div>
            <div v-else class="bg picMobile movingOpacity"><img src="~Home/03_schematically_mobile.jpg"></div>
            <div class="description movingVertical movingDelay1">
                <p>
                    ZITONSPACE日騰空間設計，<br>
                    空間層次的美 ，生活尺度的善意。<br>
                    那些細微的觀察與習慣，<br>
                    堆砌了我們最重要的日常。<br>
                    專心為使用者，以剛好的設計語彙，<br>
                    為人、為物件在日常生活中找到合適的定位，<br>
                    不為張揚而存在，<br>
                    真正的奢華是藏在骨子裡的細節，<br>
                    深入生活紋理，始終經典雋永
                </p>
            </div>
        </div>
        
    </div>
</template>

<style lang="scss" scoped>
    @import "../scss/helpers/_mixin.scss";
    @import "../scss/helpers/scrollAnimation.scss";
    @import "../scss/pages/_home.scss";
</style>
<style>
/* mobile Swiper banner style */
.swiper-pagination-bullet{
    font-size: 0;
    background: #fff;
    opacity: 0.5;
}
.swiper-pagination-bullet-active{
    opacity: 1;
}
</style>
