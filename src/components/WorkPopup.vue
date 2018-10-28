<script>
import { mapGetters } from 'vuex';
import worksData from '../assets/data/worksData.json';

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
            worksData: worksData,
            popOpenActive: 0
        }
    },
    components: {
        swiper,
        swiperSlide
    },
    mounted() {
        let worksDataLength = this.worksData.length;
        let nowDesignationKey = (this.$route.params.userId <= worksDataLength ? Number(Math.abs(this.$route.params.userId)) : 0);
        //console.log("this.$route.params.userId: ",nowDesignationKey);
        //console.log("worksData Length: ",worksDataLength);
        if(this.$route.params.userId>=worksDataLength || isNaN(Number(Math.abs(this.$route.params.userId)))) this.$router.push('/home');
        this.popOpenActive = nowDesignationKey;
    }
}
</script>

<template>
    <div class="pupPage">

        <div class="page1">
            <h1>{{worksData[popOpenActive].constructionName}}</h1>
            <div class="backBtn">
                <router-link to="/works">BACK</router-link>
                <span></span>
            </div>
            <div class="coverTopContainer">
                <div class="coverImg" :style="{backgroundImage:'url('+worksData[popOpenActive].popupCoverImg+')'}"></div>
                <div class="descriptionBox">
                    <h2>{{worksData[popOpenActive].descriptionTitle}}</h2>
                    <p v-html="worksData[popOpenActive].description"></p>
                </div>
            </div>
            <div class="introductionContent">
                <div>
                    <span></span>
                    <p v-html="worksData[popOpenActive].introduction"></p>
                </div>
            </div>
        </div>

        <div class="page3">
            <div class="swiperContainer">
                <div class="swiperLeftBtn swiperBtn">
                    <span class="swiper-button-prev" slot="button-prev"><span></span></span>
                </div>
                <div class="swiperContent">
                    <swiper :options="swiperOption">
                        <swiper-slide v-for="(item, index) in worksData[popOpenActive].popupBannerGroup"
                                    :key="index">
                            <img :src="item">
                        </swiper-slide>
                    </swiper>
                </div>
                <div class="swiperRightBtn swiperBtn">
                    <span class="swiper-button-next" slot="button-next"><span></span></span>
                </div>
            </div>
            
            <div class="designConceptContent">
                <div>
                    <span></span>
                    <p v-html="worksData[popOpenActive].designConcept"></p>
                </div>
            </div>
        </div>

        <div class="page4">
            <div class="coverBottomContainer">
                <div class="coverBottomContent">
                    <div class="coverBottomPic"><img :src="worksData[popOpenActive].popupEndCoverImg1"></div>
                    <div class="coverBottomPic"><img :src="worksData[popOpenActive].popupEndCoverImg2"></div>
                </div>
                <div class="endContent">
                    <div>
                        <p>{{worksData[popOpenActive].endText}}</p>
                    </div>
                </div>
                <div class="bg"></div>
            </div>
            <div class="backBtn">
                <router-link to="/works">BACK</router-link>
                <span></span>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
    @import "../scss/helpers/_mixin.scss";
    @import "../scss/helpers/scrollAnimation.scss";
    @import "../scss/pages/_works.scss";
</style>