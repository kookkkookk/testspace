<script>
import { mapGetters } from 'vuex';
import newsData from '../assets/data/newsData.json';

export default {
    name: 'news',
    data() {
        return {
            newsData: newsData
        }
    }
}
</script>

<template>
    <div class="newsPage firstDom">
        <!-- news main screen -->
        <div class="newsMainScreenArea pagesTopCover">
            <div>
                <h1>NEWS</h1>
                <div class="light"><img src="~News/00_light_desktop.png" alt=""></div>
                <h2>慢功細活。</h2>
                <p>
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
                <div class="cover">
                    <router-link :to="'news/'+index"
                                 :class="item.mainImgType"
                                 :style="{backgroundImage:'url('+item.mainImg+')',
                                          backgroundPosition:item.mainImgShowPosition}">

                    </router-link>
                </div>
                <div class="rightText">
                    <div>
                        <h1>{{item.title}}</h1>
                        <h2 v-html="item.subTitle"></h2>
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
