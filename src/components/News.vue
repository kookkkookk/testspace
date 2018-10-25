<script>
import { mapGetters } from 'vuex';
import newsData from '../assets/data/newsData.json';

let pupPage = {
    template: `
    <div class="pupPage">
        <div>pupPage</div>
    </div>
    `
}

export default {
    name: 'news',
    components:{
    },
    data() {
        return {
            newsData: newsData,
            isPupPage: false,
            pupOpenActive: 0
        }
    },
    mounted() {
        
    }
}
</script>

<template>
    <div class="newsPage firstDom">
        <!-- news main screen -->
        <div class="newsMainScreenArea">
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
        <div class="IntroductionArea">
            <div v-for="(item, index) in newsData"
                 :key="index">
                <div class="cover">
                    <a href="javascript:;"
                       :class="item.mainImgType"
                       :style="{backgroundImage:'url('+item.img1+')',
                                backgroundPosition:item.mainImgShowPosition}">
                    </a>
                </div>
                <div class="rightText">
                    <div>
                        <h1>{{item.title}}</h1>
                        <h2 v-html="item.subTitle"></h2>
                    </div>
                </div>
            </div>
        </div>

        <div class="pupPage" v-show="!isPupPage">
            <div class="pupContent">

                <div>
                    <div class="cover">
                        <a href="javascript:;"
                        :class="newsData[pupOpenActive].mainImgType"
                        :style="{backgroundImage:'url('+newsData[pupOpenActive].img1+')',
                                    backgroundPosition:newsData[pupOpenActive].mainImgShowPosition}">
                        </a>
                    </div>
                    <div class="rightText">
                        <div>
                            <h1>{{newsData[pupOpenActive].title}}</h1>
                            <h2 v-html="newsData[pupOpenActive].subTitle"></h2>
                            <p>{{newsData[pupOpenActive].description1}}</p>
                            <p>{{newsData[pupOpenActive].description2}}</p>
                        </div>
                    </div>
                </div>
                <div class="showPic">
                    <ul>
                        <li><img src="~News/01_pic_1-02.jpg"></li>
                        <li><img src="~News/01_pic_1-03.jpg"></li>
                        <li><img src="~News/01_pic_1-04.jpg"></li>
                    </ul>
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
