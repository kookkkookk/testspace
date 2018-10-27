<script>
import { mapGetters } from 'vuex';
import newsData from '../assets/data/newsData.json';
export default {
    name: 'newsPopup',
    data() {
        return {
            newsData: newsData,
            popOpenActive: 0
        }
    },
    mounted() {
        let newsDataLength = this.newsData.length;
        let nowDesignationKey = (this.$route.params.userId <= newsDataLength ? Number(Math.abs(this.$route.params.userId)) : 0);
        //console.log("this.$route.params.userId: ",nowDesignationKey);
        //console.log("newsData Length: ",newsDataLength);
        if(this.$route.params.userId>=newsDataLength || isNaN(Number(Math.abs(this.$route.params.userId)))) this.$router.push('/home');
        this.popOpenActive = nowDesignationKey;
    }
}
</script>

<template>
    <div class="pupPage">
        <h1>NEWS</h1>
        <div class="pupContainer">

            <div class="pupContent">
                <div class="cover">
                    <a href="javascript:;"
                        :class="newsData[popOpenActive].mainImgType"
                        :style="{backgroundImage:'url('+newsData[popOpenActive].mainImg+')',
                                backgroundPosition:newsData[popOpenActive].mainImgShowPosition}">
                    </a>
                </div>
                <div class="rightText">
                    <div>
                        <h1>{{newsData[popOpenActive].title}}</h1>
                        <h2 v-html="newsData[popOpenActive].subTitle"></h2>
                        <p v-for="(item,index) in newsData[popOpenActive].descriptionGroup"
                           :key="index">
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

            <div class="backBtn">
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