<script>
import { mapGetters } from 'vuex';
import getPagesDatas from 'api/getPagesData';
//import worksData from '../assets/data/worksData.json';

//import 'swiper/dist/css/swiper.css';
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
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    renderBullet(index, className) {
                        return `<span class="${className} swiper-pagination-bullet-custom">${index + 1}</span>`
                    }
                }
            },
            //worksData: worksData,
            worksData: [
                {
                    "constructionName": null,
                    "constructionDescription": null,
                    "popupCoverImg": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
                    "descriptionTitle": null,
                    "description": "null",
                    "introduction": null,
                    "popupBannerGroup": [],
                    "designConcept": null,
                    "popupEndCoverImgGroup": [],
                    "endText": "null"
                }
            ],
            popOpenActive: 0,
            isShowTopBtn: false,
            isPage5jumpBtnNext: true,
            isPage5jumpBtnPrev: true,
            classification_commercial: [],
            classification_interiors: []
        }
    },
    computed: {
        ...mapGetters([
            'isMobile',
            'documentHeight',
            'getScrollTop',
            'getWork_isWorkShow'
        ]),

    },
    methods: {
        scrollToTop() {
            setTimeout(() => {
                window.scrollTo(0,0);
            }, 200);
        },
        jumpWorkNum(direction){
            if(this.getWork_isWorkShow === 'All'){
                return Number(this.$route.params.userId) + direction;
            }else if(this.getWork_isWorkShow === 'Commercial'){
                return this.classification_commercial[ this.classification_commercial.indexOf(Number(this.$route.params.userId)) + direction ];
            }else if(this.getWork_isWorkShow === 'Interiors'){
                return this.classification_interiors[ this.classification_interiors.indexOf(Number(this.$route.params.userId)) + direction ];
            }
        },
        jumpWorkGo(val){
            this.$store.dispatch('runFadeOutLoading', false);

            setTimeout(() => {
                this.$scrollTo('body');
                this.$router.push('/work/'+val);
                this.popOpenActive = val;
                setTimeout(() => {
                    document.querySelectorAll(".aos-animate").forEach((el)=>{
                        el.classList.remove("aos-init");
                        el.classList.remove("aos-animate");
                    });
                    this.$aos.refreshHard();
                    this.jumpWorkBtnShowFn();
                },300)
            }, 300);
        },
        jumpWorkBtnShowFn(){
            if(this.getWork_isWorkShow === 'All'){
                (this.popOpenActive === 0 ? this.isPage5jumpBtnPrev = false : this.isPage5jumpBtnPrev = true);
                (this.popOpenActive === (this.worksData.length-1) ? this.isPage5jumpBtnNext = false : this.isPage5jumpBtnNext = true);
            }else if(this.getWork_isWorkShow === 'Commercial'){
                (this.popOpenActive === this.classification_commercial[0] ? this.isPage5jumpBtnPrev = false : this.isPage5jumpBtnPrev = true);
                (this.popOpenActive === (this.classification_commercial[this.classification_commercial.length-1]) ? this.isPage5jumpBtnNext = false : this.isPage5jumpBtnNext = true);
            }else if(this.getWork_isWorkShow === 'Interiors'){
                (this.popOpenActive === this.classification_interiors[0] ? this.isPage5jumpBtnPrev = false : this.isPage5jumpBtnPrev = true);
                (this.popOpenActive === (this.classification_interiors[this.classification_interiors.length-1]) ? this.isPage5jumpBtnNext = false : this.isPage5jumpBtnNext = true);
            }
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

            /*if(val>(document.querySelector("#app").offsetHeight-document.querySelector(".footerDsktop").offsetHeight)){
                this.isShowTopBtn = false;
            }*/
        },
        
    },
    created(){

        getPagesDatas('./assets/data/worksData.json')
        .then((response)=>{
            this.worksData = response;
        })
        .then(()=>{
            let worksDataLength = this.worksData.length || 0;
            let nowDesignationKey = (this.$route.params.userId <= worksDataLength ? Number(Math.abs(this.$route.params.userId)) : 0);
            //console.log("this.$route.params.userId: ",nowDesignationKey);
            //console.log("worksData Length: ",worksDataLength);
            if(this.$route.params.userId>=worksDataLength || isNaN(Number(Math.abs(this.$route.params.userId)))) this.$router.push('/home');
            this.popOpenActive = nowDesignationKey

            this.$store.dispatch('runFadeOutLoading', true);

            this.worksData.forEach((item, i)=>{
                if(item.classification === 'Commercial'){
                    this.classification_commercial.push(i)
                }else if(item.classification === 'Interiors'){
                    this.classification_interiors.push(i)
                }
            })
            //console.log("classification_commercial: ",this.classification_commercial);
            //console.log("classification_interiors: ",this.classification_interiors);
        })
        .catch((response)=>{
            console.log(response);
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

            //Swiper check desktop or mobile
            if(this.isMobile){
                this.swiperOption.spaceBetween=0
            }

            //mobile page5 next & prev Btn show & hide
            this.jumpWorkBtnShowFn();
        }, 50);

        //scroll anumated api
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
            <h1 data-aos="fade-down" v-html="worksData[popOpenActive].constructionName"></h1>
            <h2 data-aos="fade-down" data-aos-delay="200">{{worksData[popOpenActive].constructionDescription}}</h2>
            <div data-aos="fade-left" class="backBtn">
                <router-link to="/works" v-if="!isMobile">BACK</router-link>
                <router-link to="/works" v-else :class="{backBtnMobile:isMobile}"></router-link>
                <span></span>
            </div>
            <div class="coverTopContainer">
                <div class="coverImg"
                     :style="{backgroundImage:'url('+worksData[popOpenActive].popupCoverImg+')'}"
                     ref="coverImg"
                     data-aos="fade-right"
                     data-aos-delay="400">
                     <img :src="worksData[popOpenActive].popupCoverImg" v-if="isMobile">
                </div>
                <div class="descriptionBox" ref="descriptionBox" data-aos="fade-left" data-aos-delay="400">
                    <h2>{{worksData[popOpenActive].descriptionTitle}}</h2>
                    <p v-html="(!isMobile ? worksData[popOpenActive].description.replace(/\^/g,'') : worksData[popOpenActive].description.replace(/\<br\>/g,'').replace(/\^/g,'<br\>'))"></p>
                </div>
            </div>
            <div data-aos="fade-down" class="introductionContent" v-if="!isMobile">
                <div v-if="worksData[popOpenActive].introduction != ''">
                    <p v-html="'<span class=worksPopDescriptionLine></span>'+worksData[popOpenActive].introduction"></p>
                </div>
            </div>
        </div>

        <div class="page3">
            <div class="swiperContainer" data-aos="fade">
                <div class="swiperLeftBtn swiperBtn" v-if="!isMobile">
                    <span class="swiper-button-prev" slot="button-prev"><span></span></span>
                </div>
                <div class="swiperContent">
                    <swiper :options="swiperOption">
                        <swiper-slide v-for="(item, index) in worksData[popOpenActive].popupBannerGroup"
                                      :key="index">
                            <!-- <img :src="item || ''"> -->
                            <div class="pic" :style="{backgroundImage:'url('+item+')'}"></div>
                        </swiper-slide>
                        
                    </swiper>
                    <img src="~Works/99_work_ListingPicDefault.jpg" v-if="isMobile" style="width: 100%;visibility: hidden;">
                    <div class="mobileBg" v-if="isMobile"></div>
                    
                </div>
                <div class="swiperRightBtn swiperBtn" v-if="!isMobile">
                    <span class="swiper-button-next" slot="button-next"><span></span></span>
                </div>
            </div>
            <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
            
            <div class="designConceptContent" data-aos="fade-down" v-if="!isMobile">
                <div v-if="worksData[popOpenActive].designConcept != ''">
                    <p v-html="'<span class=worksPopDescriptionLine2></span>'+worksData[popOpenActive].designConcept"></p>
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
                        <p v-html="(!isMobile ? worksData[popOpenActive].endText.replace(/\^/g,'') : worksData[popOpenActive].endText.replace(/\<br\>/g,'').replace(/\^/g,'<br\>'))"></p>
                    </div>
                </div>
                <div class="bg"></div>
            </div>
            <div data-aos="fade-left" class="backBtn" v-if="!isMobile">
                <router-link to="/works">BACK</router-link>
                <span></span>
            </div>
        </div>

        <div class="page5" v-if="isMobile">
            <div class="page5Container">
                <ul>
                    <li v-show="isPage5jumpBtnPrev">
                        <a href="javascript:;" @click="jumpWorkGo(jumpWorkNum(-1))">PREV</a>
                    </li>
                    <li v-show="isPage5jumpBtnNext">
                        <!-- <router-link :to="{ name: 'workPopup', params: { userId: Number($route.params.userId)+1 } }">NEXTNEXT</router-link> -->
                        <a href="javascript:;" @click="jumpWorkGo(jumpWorkNum(+1))">NEXT</a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="topBtn"
             v-scroll-to="'body'"
             :class="{topBtnShow:isShowTopBtn}"
             v-if="!isMobile">TOP</div>

        <div v-else
             class="topBtnMobile"
             v-scroll-to="'body'"
             :class="{topBtnShow:isShowTopBtn}">
             <span></span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "scss/helpers/_mixin.scss";
    @import "scss/helpers/_scrollAnimation.scss";
    @import "scss/pages/_works.scss";
</style>
