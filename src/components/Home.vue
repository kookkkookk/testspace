<script>
import { mapGetters } from 'vuex';
import homeData from '../assets/data/homeData.json';
var timer, interval = 5000;
export default {
    name: 'home',
    components:{
    },
    data() {
        return {
            active: 0,
            homeData: homeData,
            el_styleLife_pic: 0
        }
    },
    computed: {
        ...mapGetters([
            'isMobile',
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
        getDomOffset() {
            setTimeout(()=>{
                this.el_styleLife_pic = document.querySelector('.lifeStyleArea .pic').offsetTop
            },100)
        }
    },
    watch: {
        getScrollTop(val) {
            if(val >= this.el_styleLife_pic && !document.querySelector(".lifeStyleArea .pic").classList.contains("on")){
                console.log("on!")
                document.querySelector('.lifeStyleArea .pic').classList.add("on")
            }
        }
    },
    created() {
        this.setHandler();
    },
    mounted(){
        this.getDomOffset();
    },
    destroyed () {

    }
}
</script>

<template>
    <div class="homePage">
        <!-- Banner -->
        <div class="bannerArea">
            
            <div class="bannerContainer">
                <span class="braceHeight">
                    <img v-if="!isMobile" src="~00_banner_desktop00_braceHeight.jpg">
                    <img v-else src="~00_banner_mobile00_braceHeight.jpg">
                </span>
                <transition-group v-if="!isMobile"
                                  tag="div"
                                  name="fade"
                                  @click.native="clickBanner(active+1)">
                    <img v-for="(item, index) in homeData[1].bannerDesktopImg"
                         :key="item"
                         :src="item"
                         v-show="active===index"/>
                </transition-group>

                <transition-group v-else
                                  tag="div"
                                  name="slide"
                                  @click.native="clickBanner(active+1)">
                    <img v-for="(item, index) in homeData[1].bannerMobileImg"
                         :key="item"
                         :src="item"
                         v-show="active===index"/>
                </transition-group>
            </div>
            <div class="titleArea">
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
        <div class="chairArea">
            <div class="bg">
                <img v-if="!isMobile" src="~01_chairBg_desktop.png">
                <img v-else src="~01_chair_mobile.png">
            </div>
            <div v-if="!isMobile" class="titleArea"></div>
            <div v-if="!isMobile" class="leftChair"></div>
            <div v-if="!isMobile" class="rightChair"></div>
            <div class="description">
                <p v-if="isMobile">
                    風格是什麼？歲月、生活、經典...<br>
                    空間是什麼？人的尺度，光影的彩度，空間的溫度。<br>
                    家是什麼？ 心之所向就是家。
                </p>
            </div>
        </div>

        <!-- Life style -->
        <div class="lifeStyleArea">
            <div>
                <h1>LIFE STYLE</h1>
                <div class="pic movingVertical"><img src="~02_schematically.jpg"></div>
                <p>
                    「有時我很想畫風景，就好像有人很想通過長時間散步來緩解心情一樣。<br>
                    在自然當中，比如樹木中，我可以看見情感與靈魂。」<br>
                    <span>—梵谷，19世紀荷蘭後印象派畫家—</span>
                </p>
            </div>
        </div>

        <!-- Schematically -->
        <div class="schematically">
            <div v-if="!isMobile" class="picDesktop"></div>
            <div v-else class="picMobile"><img src="~03_schematically_mobile.jpg"></div>
            <div class="description">
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