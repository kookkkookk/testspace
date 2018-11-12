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
        <div class="page1">

            <div class="left">
                <div class="cover">
                    <img :src="newsData[popOpenActive].mainImg">
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
    </div>
</template>

<style lang="scss" scoped>
    @import "../scss/helpers/_mixin.scss";
    @import "../scss/helpers/scrollAnimation.scss";
    @import "../scss/pages/_news.scss";
</style>