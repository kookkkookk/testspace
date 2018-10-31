<script>
import brandingData from '../assets/data/brandingData.json';
export default {
    name: 'branding',
    data() {
        return {
            brandingData: brandingData
        }
    },
    computed: {
        brandingDataReverse(){
            return this.brandingData.reverse()
        },
        brandingDataRemainder(){
            return this.brandingData.length % 3;
        }

    }
}
</script>

<template>
    <div class="brandingPage firstDom">
        <div class="brandingMainScreenArea pagesTopCover">
            <div>
                <h1>BRANDING</h1>
                <h2>看不見的設計。</h2>
                <p>
                    當你把宇宙放在心上，宇宙才會存在。<br>
                    動見場域的優缺點，<br>
                    避免先入為主的設計，<br>
                    傾聽需求，尋找使用的平衡美學<br>
                    空間的向度，生活的溫度 ，人文的尺度，<br>
                    設計師是小我，空間才是大宇宙。 
                </p>
                <div class="artWorkBg"></div>
            </div>
        </div>

        <!-- Creator Area -->
        <div class="creatorArea">
            <div class="creatorContainer">
                <div class="creatorInformation">
                    <h3>創辦人</h3>
                    <div class="creator"><img src="~Branding/01_creator.jpg"></div>
                    <h1>創辦人暨設計總監<br>陳 詠婕</h1>
                    <h2>
                        「設計來自生活，生活因設計改變，<br>
                        回歸設計需求，以細節成就完美，彰顯本質。」<br>
                        從大型設計公司、大元建築事務所洗禮，到創辦個人公司，<br>
                        三十年設計路，紮實耕耘始終如一，<br>
                        從住宅到商業，一件件精彩作品，造就多種形式的空間表情。
                    </h2>
                    <ul>
                        <li>1989~1991 年曾任職 優騰國際室內設計有限公司 iDA Workplace + Strategy</li>
                        <li>1991~1998 年曾任職 大元聯合建築師事務所 KRIS YAO∣ARTECH</li>
                        <li>1999 年成立 日騰空間設計有限公司</li>
                    </ul>
                </div>
                
                
                <div class="spacePic spacePic1"><img src="~Branding/01_space_1.jpg"></div>
                <div class="spacePic spacePic2"><img src="~Branding/01_space_2.jpg"></div>
                <div class="spacePic spacePic3"><img src="~Branding/01_space_3.jpg"></div>
                
            </div>
        </div>

        <div class="designConceptArea">
            <div class="designConceptContainer">
                <div class="pic"><img src="~Branding/02_schematicDiagram.jpg"></div>
                <div class="title">
                    <h3>設計<span>理念</span></h3>
                    <h1>生活與設計對話</h1>
                </div>
                <div class="discription">
                    <ul>
                        <li>
                            「設計的細節可以看出設計師的意圖。」<br>
                            面對客戶與空間，我們堅持的只是一種價值觀，<br>
                            型隨機能、與時俱進，盡力改善優化，<br>
                            堅持自己的價值觀，相信美的感召力。
                        </li>
                        <li>
                            日騰空間設計創辦人，陳總監，以美感為軸，<br>
                            空間為伍，喜愛白色系的她，在設計世界也有<br>
                            自己的白色美學，反映在設計或公司空間上，<br>
                            可見單一與多元，包容與調和，<br>
                            純粹與共生，內斂與優雅。
                        </li>
                        <li>
                            如果說創作是天份，還有不斷的學習，<br>
                            才能累積豐沛的創造力，儘管泰半人生<br>
                            在設計領域裡，日夜追尋靈感與創意拉拔，<br>
                            然而堅韌的柔情與對設計熱情，精進淬煉無限可能。
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="collectionWorksArea" :class="{addBottomPadding: brandingDataRemainder!==0}">
            <div class="collectionWorksContainer">
                <h3>歷年<span>作品</span></h3>
                <div class="collectionWorksContent">
                    <div class="workList" v-for="(item, index) in brandingDataReverse" :key="index">
                        <h1>{{item.year}}</h1>
                        <ul>
                            <li v-for="(list, n) in item.works" :key="n">{{list}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="woodBg" :class="{moveTop: brandingDataRemainder!==0}"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "../scss/helpers/_mixin.scss";
    @import "../scss/helpers/scrollAnimation.scss";
    @import "../scss/pages/_branding.scss";
</style>