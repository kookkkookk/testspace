<script>
import { mapGetters, mapActions } from 'vuex';
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
            popOpenActive: 0,
            isShowTopBtn: false,
            isTopBtnUp: false,
            isPage5jumpBtnNext: true,
            isPage5jumpBtnPrev: true
        }
    },
    computed: {
        ...mapGetters([
            'isMobile',
            'documentHeight',
            'getScrollTop',
            'stateNewsPageData'
        ]),

    },
    methods: {
        ...mapActions([
            'getNewsPageData'
        ]),
        scrollToTop() {
            setTimeout(() => {
                window.scrollTo(0,0);
            }, 200);
        },
        jumpNewsPop(val){
            this.$store.dispatch('runFadeOutLoading', false);
            setTimeout(() => {
                this.$scrollTo('body');
                this.$router.push('/news/'+val);
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
            (this.popOpenActive===(this.stateNewsPageData.length-1) ? this.isPage5jumpBtnNext=false:this.isPage5jumpBtnNext=true);
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

            if(val >= document.getElementById("app").offsetHeight - 100){
                console.log('UP')
                this.isTopBtnUp = true;
            }else{
                this.isTopBtnUp = false;
            }
        }
    },
    created(){
        this.getNewsPageData().then(()=>{
            let newsDataLength = this.stateNewsPageData.length || 0;
            let nowDesignationKey = (this.$route.params.userId <= newsDataLength ? Number(Math.abs(this.$route.params.userId)) : 0);

            if(this.$route.params.userId>=newsDataLength || isNaN(Number(Math.abs(this.$route.params.userId)))) this.$router.push('/home');
            this.popOpenActive = nowDesignationKey;

            this.$store.dispatch('runFadeOutLoading', true);
        });
    },
    mounted() {

        setTimeout(() => {
            //mobile page5 next & prev Btn show & hide
            this.mobileJumpBtnisShow();
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
        <div class="mobileCover" v-if="isMobile">
            <div class="newsMainScreenArea pagesTopCover" ref="newsMainScreenArea">
                <div>
                    <h1 data-aos="fade-left" ref="title">NEWS</h1>
                    <div data-aos="fade" data-aos-delay="400" class="light" ref="ligth"><img src="~News/00_light_desktop.png" alt=""></div>
                    <h2 data-aos="fade-right" data-aos-delay="200" ref="subTitle">慢功細活</h2>
                </div>
                <span class="bottomWhite"></span>
            </div>
        </div>

        <div class="backBtn">
            <router-link to="/news" v-if="!isMobile" data-aos="fade-left">BACK</router-link>
            <router-link to="/news" v-else :class="{backBtnMobile:isMobile}"></router-link>
            <span data-aos="fade-left"></span>
        </div>

        <div class="mainScreen">

            <div class="left" data-aos="fade-left">
                <div class="cover" :style="{backgroundImage:'url('+stateNewsPageData[popOpenActive].mainImg+')'}">
                    <img v-if="stateNewsPageData[popOpenActive].mainImgDirection==='straight'" src="~News/99_popupCoverDefult_straight.jpg">
                    <img v-else src="~News/99_popupCoverDefult_horizontal.jpg">
                </div>
            </div>
            <div class="right">
                <div>
                    <h3 data-aos="fade-left" data-aos-delay="200">{{stateNewsPageData[popOpenActive].title}}</h3>
                    <h4 data-aos="fade-left" data-aos-delay="300" v-html="(!isMobile ? stateNewsPageData[popOpenActive].subTitle.replace(/\^/g,'') : stateNewsPageData[popOpenActive].subTitle.replace(/\<br\>/g,'').replace(/\^/g,'<br\>'))"></h4>
                    <div data-aos="fade-left" data-aos-delay="400" class="line"></div>
                    <h5 data-aos="fade-left" data-aos-delay="500" v-if="stateNewsPageData[popOpenActive].subTitleTwo" v-html="(!isMobile ? stateNewsPageData[popOpenActive].subTitleTwo.replace(/\^/g,'') : stateNewsPageData[popOpenActive].subTitleTwo.replace(/\<br\>/g,'').replace(/\^/g,'<br\>'))"></h5>
                    <p v-for="(item, index) in stateNewsPageData[popOpenActive].description"
                       :key="index"
                       data-aos="fade-left"
                       :data-aos-delay="(index+5)*100"
                       v-html="(!isMobile ? item.replace(/\^/g,''):item.replace(/\<br\>/g,'').replace(/\^/g,'<br\>'))"></p>
                </div>
            </div>
        </div>

        <div class="anOtherScreen">

            <div v-if="stateNewsPageData[popOpenActive].switchPic.length>0"
                 class="swiperArea"
                 data-aos="fade-left">

                <div class="swiperContainer" data-aos="fade">
                    <div class="swiperLeftBtn swiperBtn" v-if="!isMobile">
                        <span class="swiper-button-prev" slot="button-prev"><span></span></span>
                    </div>
                    <div class="swiperContent">
                        <swiper :options="swiperOption">
                            <swiper-slide v-for="(item, index) in stateNewsPageData[popOpenActive].switchPic"
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

            <div v-if="stateNewsPageData[popOpenActive].displayAreaGroup.length > 0"
                 v-for="(item,index) in stateNewsPageData[popOpenActive].displayAreaGroup"
                 :key="index"
                 class="showcaseArea">
                <div v-if="isMobile" class="showcaseLine" data-aos="fade-left"></div>
                <h1 v-if="item.title" data-aos="fade-left">{{item.title}}</h1>
                <div class="coverBottomContent"
                     :class="{alignmentDirectionTop:item.alignmentDirection==='top',
                              alignmentDirectionBottom:item.alignmentDirection==='bottom'}">
                    <div class="coverBottomPic"
                         v-for="(picItem, n) in item.displayPic"
                         :key="n"
                         :class="{horizontal:picItem.imgDirection==='horizontal',
                                  straight:picItem.imgDirection==='straight'}"
                         data-aos="fade-down"
                         :data-aos-delay="n*200">
                        <img :src="picItem.img">
                    </div>
                </div>
                <div v-if="isMobile" class="lastBg"></div>
            </div>
        </div>
        <div class="lastArea"
             :class="{bgWhite: Math.abs((stateNewsPageData[popOpenActive].displayAreaGroup.length + (stateNewsPageData[popOpenActive].switchPic.length>0? 1:0)) % 2)===1,
                       bgGrey: (stateNewsPageData[popOpenActive].displayAreaGroup.length + (stateNewsPageData[popOpenActive].switchPic.length>0? 1:0)) % 2 === 0}">

            <div data-aos="fade-left" class="backBtn" v-if="!isMobile">
                <router-link to="/news">BACK</router-link>
                <span></span>
            </div>

            <div class="page5Container" v-else>
                <ul>
                    <li v-show="isPage5jumpBtnPrev">
                        <a href="javascript:;" @click="jumpNewsPop(Number($route.params.userId)-1)">PREV</a>
                    </li>
                    <li v-show="isPage5jumpBtnNext">
                        <!-- <router-link :to="{ name: 'workPopup', params: { userId: Number($route.params.userId)+1 } }">NEXTNEXT</router-link> -->
                        <a href="javascript:;" @click="jumpNewsPop(Number($route.params.userId)+1)">NEXT</a>
                    </li>
                </ul>
            </div>
        </div>

        <div v-if="isMobile"
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
    @import "scss/pages/_news.scss";
    .topBtnMobile.up{
        >span{
            background-color: #fff;
            &::after{
                background-color: #fff;
            }
        }
    }
</style>
