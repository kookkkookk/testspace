<script>
import { mapGetters } from 'vuex';
//import newsData from '../assets/data/newsData.json';

//import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    name: 'newsPopup',
    data() {
        return {
            swiperOption: {
                spaceBetween: 30,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    renderBullet(index, className) {
                        return `<span class="${className} swiper-pagination-bullet-custom">${index + 1}</span>`
                    }
                }
            },
            loading: true,
            //newsData: newsData,
            newsData: [
                {
                    "typeName": null,
                    "subTypeName": null,
                    "title": null,
                    "subTitle": null,
                    "subTitleTwo": null,
                    "description": [],
                    "mainImg": "src/images/99_default_init.jpg",
                    "mainImgDirection": "straight",
                    "switchPic": [],
                    "displayAreaGroup": [
                        {
                            "title": null,
                            "alignmentDirection": "top",
                            "displayPic": []
                        }
                    ]
                }
            ],
            popOpenActive: 0
        }
    },
    computed: {
        ...mapGetters([
            'isMobile',
            'documentHeight',
            'getScrollTop'
        ]),

    },
    methods: {
        scrollToTop() {
            setTimeout(() => {
                window.scrollTo(0,0);
            }, 200);
        }
    },
    components: {
        swiper,
        swiperSlide
    },
    created(){
        this.$axios.get('./assets/data/newsData.json').then((response) => {
            this.newsData = response.data;
        })
        .catch((error)=> {
            console.log("!ERROR: Ajax newsData.json fail: ",error)
        })
        .then(()=> {
            let newsDataLength = this.newsData.length || 0;
            let nowDesignationKey = (this.$route.params.userId <= newsDataLength ? Number(Math.abs(this.$route.params.userId)) : 0);
            //console.log("this.$route.params.userId: ",nowDesignationKey);
            //console.log("newsData Length: ",newsDataLength);
            if(this.$route.params.userId>=newsDataLength || isNaN(Number(Math.abs(this.$route.params.userId)))) this.$router.push('/home');
            this.popOpenActive = nowDesignationKey;

            const { _loading } = this.$refs
            const timeline = new TimelineLite()
            timeline.to(_loading, 0.3, {autoAlpha: 0})
                    .add(()=>{ this.loading=false })
        })
    },
    mounted() {

        //scroll anumated api
        this.$aos.init()
        this.$aos.init({
            duration: 500,
            once: true
        })
    }
}
</script>

<template>
    <div class="pupPage">
        <div class="_loading" ref="_loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
        <div data-aos="fade-left" class="backBtn">
            <router-link to="/works" v-if="!isMobile">BACK</router-link>
            <router-link to="/works" v-else :class="{backBtnMobile:isMobile}"></router-link>
            <span></span>
        </div>

        <div class="mobileCover" v-if="isMobile"></div>

        <div class="mainScreen">

            <div class="left">
                <div class="cover" :style="{backgroundImage:'url('+newsData[popOpenActive].mainImg+')'}">
                    <img v-if="newsData[popOpenActive].mainImgDirection==='straight'" src="~News/99_popupCoverDefult_straight.jpg">
                    <img v-else src="~News/99_popupCoverDefult_horizontal.jpg">
                </div>
            </div>
            <div class="right">
                <div>
                    <h3>{{newsData[popOpenActive].title}}</h3>
                    <h4 v-html="newsData[popOpenActive].subTitle"></h4>
                    <div class="line"></div>
                    <h5 v-if="newsData[popOpenActive].subTitleTwo" v-html="newsData[popOpenActive].subTitleTwo"></h5>
                    <p v-for="(item, index) in newsData[popOpenActive].description"
                       :key="index">{{item}}</p>
                </div>
            </div>
        </div>

        <div class="anOtherScreen">

            <div v-if="newsData[popOpenActive].switchPic.length>0"
                 class="swiperArea">

                <div class="swiperContainer" data-aos="fade">
                    <div class="swiperLeftBtn swiperBtn" v-if="!isMobile">
                        <span class="swiper-button-prev" slot="button-prev"><span></span></span>
                    </div>
                    <div class="swiperContent">
                        <swiper :options="swiperOption">
                            <swiper-slide v-for="(item, index) in newsData[popOpenActive].switchPic"
                                          :key="index">
                                <!-- <img :src="item || ''"> -->
                                <div class="pic" :style="{backgroundImage:'url('+item+')'}"></div>
                            </swiper-slide>
                            
                        </swiper>
                        <img src="~News/99_popupSwitchDefaultPic.jpg" v-if="isMobile" style="width:100%;visibility:hidden;">
                        
                    </div>
                    <div class="swiperRightBtn swiperBtn" v-if="!isMobile">
                        <span class="swiper-button-next" slot="button-next"><span></span></span>
                    </div>
                </div>
                <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
            </div>

            <div v-if="newsData[popOpenActive].displayAreaGroup.length>0"
                 v-for="(item,index) in newsData[popOpenActive].displayAreaGroup"
                 :key="index"
                 class="showcaseArea">
                <h1 v-if="item.title">{{item.title}}</h1>
                <div class="coverBottomContent"
                     :class="{alignmentDirectionTop:item.alignmentDirection==='top',
                              alignmentDirectionBottom:item.alignmentDirection==='bottom'}">
                    <div class="coverBottomPic"
                         v-for="(picItem, n) in item.displayPic"
                         :key="n"
                         data-aos="fade-down"
                         :data-aos-delay="n*200">
                        <img :src="picItem">
                    </div>
                </div>
            </div>
        </div>
        <div class="lastArea"
             :class="{bgWhite: Math.abs((newsData[popOpenActive].displayAreaGroup.length + (newsData[popOpenActive].switchPic.length>0? 1:0)) % 2)===1,
                       bgGrey: (newsData[popOpenActive].displayAreaGroup.length + (newsData[popOpenActive].switchPic.length>0? 1:0)) % 2 === 0}">
            <!-- backbtn -->
        </div>

    </div>
</template>

<style lang="scss" scoped>
    @import "../scss/helpers/_mixin.scss";
    @import "../scss/helpers/scrollAnimation.scss";
    @import "../scss/pages/_news.scss";
</style>