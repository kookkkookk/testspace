<script>
import { mapGetters } from 'vuex';
//import newsData from '../assets/data/newsData.json';

export default {
    name: 'news',
    data() {
        return {
            loading: true,
            //newsData: newsData
            newsData: [
                {
                    "title": null,
                    "subTitle": null,
                    //"descriptionGroup":[],
                    "mainImg": "src/images/99_default_init.jpg",
                    "mainImgType": null,
                    "mainImgShowPosition": null,
                    //"imgGroup": []
                }
            ]
        }
    },
    computed: {
        ...mapGetters([
            'isMobile',
            'getScrollTop'
        ]),
        newsDataLength(){
            return newsData.length
        }
    },
    methods: {
        scrollToTop() {
            setTimeout(() => {
                window.scrollTo(0,0);
            }, 200);
        }
    },
    created(){
        this.$axios.get('./assets/data/newsData.json').then((response) => {
            this.newsData = response.data;
        })
        .catch((error)=> {
            console.log("!ERROR: Ajax newsData.json fail: ",error)
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
        const { ligth } = this.$refs
        const timeline = new TimelineLite()
        timeline.from(title, 0.5, {opacity: 0, x: -30, delay: 0.3})
                .from([subTitle,description], 0.5, {opacity: 0, y: -10})
                .from(ligth, 0.5, {opacity: 0})

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
    <div class="newsPage firstDom">
        <div class="_loading" ref="_loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
        <!-- news main screen -->
        <div class="newsMainScreenArea pagesTopCover" ref="newsMainScreenArea">
            <div>
                <h1 ref="title">NEWS</h1>
                <div class="light" ref="ligth"><img src="~News/00_light_desktop.png" alt=""></div>
                <h2 ref="subTitle">慢功細活。</h2>
                <p ref="description">
                    我們的設計，一尺一寸亦如書法裡一筆一畫，<br>
                    孕育累積，方見天地；<br>
                    內斂優雅，一分溫柔的氣質；<br>
                    在設計與尺度中，回應生活的本質。
                </p>
            </div>
            <span class="bottomWhite"></span>
        </div>

        <!-- Introduction -->
        <div class="introductionArea">
            <div v-for="(item, index) in newsData"
                 :key="index">
                <div data-aos="fade-right" class="cover">
                    <router-link :to="'news/'+index"
                                 :class="item.mainImgType"
                                 @click.native="scrollToTop"
                                 :style="{backgroundImage:'url('+item.mainImg+')',
                                          backgroundPosition:item.mainImgShowPosition}">

                    </router-link>
                </div>
                <div class="rightText">
                    <div>
                        <h1 data-aos="fade-right" data-aos-delay="200">{{item.title}}</h1>
                        <h2 data-aos="fade-right" data-aos-delay="400" v-html="item.subTitle"></h2>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
    @import "../scss/helpers/_mixin.scss";
    @import "../scss/helpers/scrollAnimation.scss";
    @import "../scss/pages/_news.scss";
</style>
