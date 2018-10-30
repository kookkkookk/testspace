<script>
import { mapGetters } from 'vuex';
import worksData from '../assets/data/worksData.json';
export default {
    name: 'works',
    data() {
        return {
            worksData: worksData,
            isWorkShow: "All",
            isWorkSwitching: null
        }
    },
    methods: {
        changeWorksShow(val){
            this.isWorkSwitching = 'hideing'
            setTimeout(()=>{
                this.isWorkShow = val
            },500)
            setTimeout(()=>{
                this.isWorkSwitching = 'showing'
            },550)
            setTimeout(()=>{
                this.isWorkSwitching = null
            },1050)
        },
        scrollToTop() {
            setTimeout(() => {
                window.scrollTo(0,0);
            }, 200);
        }
    }
}
</script>

<template>
    <div class="worksPage firstDom">
        <!-- Works main screen -->
        <div class="worksMainScreenArea pagesTopCover">
            <div>
                <h1>WORKS</h1>
                <h2>型隨機能。</h2>
                <p>
                    設計是理性的； 想法是感性的。<br>
                    空間本身就是故事，無需雕琢更不用華麗語彙，<br>
                    我們的設計以人為核心，溫柔保護內在空間的舒適與安全，<br>
                    以生活場所與自然棲所，滋養豐富居住者的每一日。
                </p>
                <div class="classificationMenu">
                    <ul>
                        <li>
                            <a href="javascript:;" 
                               :class="{active:isWorkShow==='All'}" 
                               @click="changeWorksShow('All')">ALL</a>
                        </li>
                        <li>
                            <a href="javascript:;" 
                               :class="{active:isWorkShow==='Commercial'}" 
                               @click="changeWorksShow('Commercial')">COMMERCIAL</a>
                        </li>
                        <li>
                            <a href="javascript:;" 
                               :class="{active:isWorkShow==='Interiors'}" 
                               @click="changeWorksShow('Interiors')">INTERIORS</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Works -->
        <div class="worksArea">
            <div class="topGrey"></div>
            <div class="worksContent">
                <div v-for="(item,index) in worksData"
                     :key="index"
                     v-show="isWorkShow==='All' || isWorkShow===item.classification"
                     :class="{hideing:isWorkSwitching==='hideing',showing:isWorkSwitching==='showing'}">
                    <!-- <a href="javascript:;">
                        <img :src="item.listingPageImg2" class="picOpposite">
                        <img :src="item.listingPageImg1" class="pic">
                    </a> -->
                    <router-link :to="'work/'+index"
                                 @click.native="scrollToTop">
                        <img :src="item.listingPageImg2" class="picOpposite">
                        <img :src="item.listingPageImg1" class="pic">
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "../scss/helpers/_mixin.scss";
    @import "../scss/helpers/scrollAnimation.scss";
    @import "../scss/pages/_works.scss";
</style>