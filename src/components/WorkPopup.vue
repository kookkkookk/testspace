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
            isPage5jumpBtnPrev: true
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
        },
        jumpWorkPop(val){
            //this.$router.push('/work/'+val);
            //this.scrollToTop()
            /*this.$scrollTo('body')
            setTimeout(() => {
                if(val==='next'){
                    this.$router.push({ name: 'workPopup', params: {userId: (this.popOpenActive+1)} })
                    history.go(0);
                }else if(val==='prev'){
                    this.$router.push({ name: 'workPopup', params: {userId: (this.popOpenActive-1)} })
                    history.go(0);
                }
            }, 500)*/
            // this.loading = true;
            // setTimeout(() => {
            //     const { _loading } = this.$refs;
            //     const timeline = new TimelineLite();
            //     timeline.to(_loading, 0.3, {autoAlpha: 1})
            //             .add(()=>{
            //                 //window.scrollTo(0,0);
            //                 this.$scrollTo('body');
            //                 this.$router.push('/work/'+val);
            //                 this.popOpenActive = val;
            //                 setTimeout(() => {
            //                     document.querySelectorAll(".aos-animate").forEach((el)=>{
            //                         el.classList.remove("aos-init");
            //                         el.classList.remove("aos-animate");
            //                     });
            //                     this.$aos.refreshHard();
            //                     this.mobileJumpBtnisShow();
            //                     timeline.to(_loading, 0.3, {autoAlpha: 0})
            //                             .add(()=>{this.loading = false});
            //                 },300)
            //             });
            // }, 50)
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
                    this.mobileJumpBtnisShow();
                },300)
            }, 300);
        },
        mobileJumpBtnisShow(){
            (this.popOpenActive===0 ? this.isPage5jumpBtnPrev=false:this.isPage5jumpBtnPrev=true);
            (this.popOpenActive===(this.worksData.length-1) ? this.isPage5jumpBtnNext=false:this.isPage5jumpBtnNext=true);
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
        // this.$axios.get('./assets/data/worksData.json').then((response) => {
        //     if(location.hostname === "localhost"){
        //         this.worksData = JSON.parse(JSON.stringify(response.data).replace(/.\/images\//g, "src/images/"));
        //     }else{
        //         this.worksData = response.data;
        //     }
        // })
        // .catch((error)=> {
        //     console.log("!ERROR: Ajax worksData.json fail: ",error)
        // })
        // .then(()=> {
        //     let worksDataLength = this.worksData.length || 0;
        //     let nowDesignationKey = (this.$route.params.userId <= worksDataLength ? Number(Math.abs(this.$route.params.userId)) : 0);
        //     //console.log("this.$route.params.userId: ",nowDesignationKey);
        //     //console.log("worksData Length: ",worksDataLength);
        //     if(this.$route.params.userId>=worksDataLength || isNaN(Number(Math.abs(this.$route.params.userId)))) this.$router.push('/home');
        //     this.popOpenActive = nowDesignationKey

        //     this.$store.dispatch('runFadeOutLoading', true);
        // })

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
            this.mobileJumpBtnisShow();
        }, 50);

        

        //scroll anumated api
        this.$aos.init({
            duration: 500,
            once: true
        })
        
    },
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
                        <!-- <a href="javascript:;" @click="jumpWorkPop('prev')">
                            PREV
                        </a> -->
                        <a href="javascript:;" @click="jumpWorkPop(Number($route.params.userId)-1)">PREV</a>
                    </li>
                    <li v-show="isPage5jumpBtnNext">
                        <!-- <a href="javascript:;" @click="jumpWorkPop('next')">
                            NEXT
                        </a> -->
                        <!-- <router-link :to="{ name: 'workPopup', params: { userId: Number($route.params.userId)+1 } }">NEXTNEXT</router-link> -->
                        <a href="javascript:;" @click="jumpWorkPop(Number($route.params.userId)+1)">NEXT</a>
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

<style>
span.worksPopDescriptionLine{
    width: 1px;
    height: 100%;
    max-height: 160px;
    background-color: #000;
    position: absolute;
    top: 0;
    left: 0;
}
@media screen and (max-width: 1600px) {
    span.worksPopDescriptionLine{
        min-height: 150px;
    }
}
@media screen and (max-width: 1366px) {
    span.worksPopDescriptionLine{
        min-height: 130px;
    }
}
@media screen and (max-width: 1024px) {
    span.worksPopDescriptionLine{
        min-height: 110px;
    }
}

span.worksPopDescriptionLine2{
    width: 1px;
    height: 100%;
    max-height: 112px;
    background-color: #000;
    position: absolute;
    top: 0;
    left: 0;
}
@media screen and (max-width: 1366px) {
    span.worksPopDescriptionLine2{
        max-height: 112px;
    }
}

/* mobile Swiper banner style */
.page3 .swiper-pagination-bullet{
    font-size: 0;
    margin: 0 4px;
    background: #5e5e5e;
    opacity: 0.5;
}
.page3 .swiper-pagination-bullet-active{
    opacity: 1;
}
</style>