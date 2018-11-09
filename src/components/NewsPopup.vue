<script>
import { mapGetters } from 'vuex';
//import newsData from '../assets/data/newsData.json';
export default {
    name: 'newsPopup',
    data() {
        return {
            loading: true,
            //newsData: newsData,
            newsData: [
                {
                    "title": null,
                    "subTitle": null,
                    "descriptionGroup":[],
                    "mainImg": "src/images/99_default_init.jpg",
                    "mainImgType": null,
                    "mainImgShowPosition": null,
                    "imgGroup": []
                }
            ],
            popOpenActive: 0
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
        <h1 data-aos="fade-left">NEWS</h1>
        <div class="pupContainer">

            <div class="pupContent">
                <div data-aos="fade-right" data-aos-delay="200" class="cover">
                    <a href="javascript:;"
                        :class="newsData[popOpenActive].mainImgType"
                        :style="{backgroundImage:'url('+newsData[popOpenActive].mainImg+')',
                                backgroundPosition:newsData[popOpenActive].mainImgShowPosition}">
                    </a>
                </div>
                <div class="rightText">
                    <div>
                        <h1 data-aos="fade-left" data-aos-delay="400">{{newsData[popOpenActive].title}}</h1>
                        <h2 data-aos="fade-left" data-aos-delay="600" v-html="newsData[popOpenActive].subTitle"></h2>
                        <p v-for="(item,index) in newsData[popOpenActive].descriptionGroup"
                           :key="index"
                           data-aos="fade-left"
                           :data-aos-delay="(index*200)+600">
                           {{item}}
                        </p>
                    </div>
                </div>
            </div>
            <div class="showPic">
                <div v-for="(item,index) in newsData[popOpenActive].imgGroup"
                     :key="index"
                     :class="{three:newsData[popOpenActive].imgGroup.length>=3,two:newsData[popOpenActive].imgGroup.length<=2}">
                    <img :src="item">
                </div>
            </div>

            <div data-aos="fade-left" class="backBtn">
                <router-link to="/news">BACK</router-link>
                <span></span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "../scss/helpers/_mixin.scss";
    @import "../scss/helpers/scrollAnimation.scss";
    @import "../scss/pages/_news.scss";
</style>