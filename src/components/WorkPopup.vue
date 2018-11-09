<script>
import { mapGetters } from 'vuex';
//import worksData from '../assets/data/worksData.json';

import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    name: 'workPopup',
    data() {
        return {
            swiperOption: {
                spaceBetween: 30,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            },
            //worksData: worksData,
            worksData: [
                {
                    /*"classification": null,
                    "listingPageImg1": null,
                    "listingPageImg2": null,*/
                    "constructionName": null,
                    "popupCoverImg": "src/images/99_default_init.jpg",
                    "descriptionTitle": null,
                    "description": null,
                    "introduction": null,
                    "popupBannerGroup": [],
                    "designConcept": null,
                    "popupEndCoverImgGroup": [],
                    "endText": null
                }
            ],
            popOpenActive: 0,
            isShowTopBtn: false
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
    watch: {
        getScrollTop(val){
            if(val>=(this.documentHeight+200)){
                this.isShowTopBtn = true;
            }else{
                this.isShowTopBtn = false
            }

            if(val>(document.querySelector("#app").offsetHeight-document.querySelector(".footerDsktop").offsetHeight)){
                this.isShowTopBtn = false;
            }
        }
    },
    created(){
        this.$axios.get('./assets/data/worksData.json').then((response) => {
            this.worksData = response.data;
        })
        .catch((error)=> {
            console.log("!ERROR: Ajax worksData.json fail: ",error)
        })
        .then(()=> {
            let worksDataLength = this.worksData.length || 0;
            let nowDesignationKey = (this.$route.params.userId <= worksDataLength ? Number(Math.abs(this.$route.params.userId)) : 0);
            //console.log("this.$route.params.userId: ",nowDesignationKey);
            //console.log("worksData Length: ",worksDataLength);
            if(this.$route.params.userId>=worksDataLength || isNaN(Number(Math.abs(this.$route.params.userId)))) this.$router.push('/home');
            this.popOpenActive = nowDesignationKey
        })
    },
    mounted() {
        
        //descriptionBox position central
        const { coverImg } = this.$refs
        const { descriptionBox } = this.$refs
        setTimeout(() => {
            //console.log(coverImg.clientHeight + " " + descriptionBox.clientHeight)
            let descriptionBoxTopPosition = (coverImg.clientHeight - descriptionBox.clientHeight)/2;
            descriptionBox.style.top = descriptionBoxTopPosition+'px';
        }, 50);

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

        <div class="page1">
            <h1 data-aos="fade-down">{{worksData[popOpenActive].constructionName}}</h1>
            <div data-aos="fade-left" class="backBtn">
                <router-link to="/works">BACK</router-link>
                <span></span>
            </div>
            <div class="coverTopContainer">
                <div class="coverImg"
                     :style="{backgroundImage:'url('+worksData[popOpenActive].popupCoverImg+')'}"
                     ref="coverImg"
                     data-aos="fade-right">
                </div>
                <div class="descriptionBox" ref="descriptionBox" data-aos="fade-left">
                    <h2>{{worksData[popOpenActive].descriptionTitle}}</h2>
                    <p v-html="worksData[popOpenActive].description"></p>
                </div>
            </div>
            <div data-aos="fade-down" class="introductionContent">
                <div v-if="worksData[popOpenActive].introduction != ''">
                    <span></span>
                    <p v-html="worksData[popOpenActive].introduction"></p>
                </div>
            </div>
        </div>

        <div class="page3">
            <div class="swiperContainer" data-aos="fade">
                <div class="swiperLeftBtn swiperBtn">
                    <span class="swiper-button-prev" slot="button-prev"><span></span></span>
                </div>
                <div class="swiperContent">
                    <swiper :options="swiperOption">
                        <swiper-slide v-for="(item, index) in worksData[popOpenActive].popupBannerGroup"
                                      :key="index">
                            <img :src="item || ''">
                        </swiper-slide>
                    </swiper>
                </div>
                <div class="swiperRightBtn swiperBtn">
                    <span class="swiper-button-next" slot="button-next"><span></span></span>
                </div>
            </div>
            
            <div class="designConceptContent" data-aos="fade-down">
                <div v-if="worksData[popOpenActive].designConcept != ''">
                    <span></span>
                    <p v-html="worksData[popOpenActive].designConcept"></p>
                </div>
            </div>
        </div>

        <div class="page4">
            <div class="coverBottomContainer">
                <div class="coverBottomContent">
                    <div class="coverBottomPic"
                         v-for="(item, index) in worksData[popOpenActive].popupEndCoverImgGroup"
                         :key="index"
                         data-aos="fade-down"
                         :data-aos-delay="index*200">
                        <img :src="item">
                    </div>
                </div>
                <div data-aos="fade-right" class="endContent">
                    <div>
                        <p>{{worksData[popOpenActive].endText}}</p>
                    </div>
                </div>
                <div class="bg"></div>
            </div>
            <div data-aos="fade-left" class="backBtn">
                <router-link to="/works">BACK</router-link>
                <span></span>
            </div>
        </div>

        <div class="topBtn"
             v-scroll-to="'body'"
             :class="{topBtnShow:isShowTopBtn}">TOP</div>
    </div>
</template>

<style lang="scss" scoped>
    @import "../scss/helpers/_mixin.scss";
    @import "../scss/helpers/scrollAnimation.scss";
    @import "../scss/pages/_works.scss";
</style>