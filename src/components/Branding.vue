<script>
//import brandingData from '../assets/data/brandingData.json';
export default {
    name: 'branding',
    data() {
        return {
            loading: true,
            //brandingData: brandingData
            brandingData: [
                {
                    "year":null,
                    "works":[]
                }
            ]
        }
    },
    computed: {
        brandingDataReverse(){
            return this.brandingData.reverse()
        },
        brandingDataRemainder(){
            return this.brandingData.length % 3;
        }
    },
    created(){
        this.$axios.get('./assets/data/brandingData.json').then((response) => {
            this.brandingData = response.data;
        })
        .catch((error)=> {
            console.log("!ERROR: Ajax brandingData.json fail: ",error)
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
        const { artWorkBg } = this.$refs
        const timeline = new TimelineLite()
        timeline.from(title, 0.5, {opacity: 0, x: -30, delay: 0.3})
                .from([subTitle,description], 0.5, {opacity: 0, y: -10})
                .from(artWorkBg, 0.5, {opacity: 0})

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
    <div class="brandingPage firstDom">
        <div class="_loading" ref="_loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
        <div class="brandingMainScreenArea pagesTopCover">
            <div>
                <h1 ref="title">BRANDING</h1>
                <h2 ref="subTitle">看不見的設計。</h2>
                <p ref="description">
                    當你把宇宙放在心上，宇宙才會存在。<br>
                    動見場域的優缺點，<br>
                    避免先入為主的設計，<br>
                    傾聽需求，尋找使用的平衡美學<br>
                    空間的向度，生活的溫度 ，人文的尺度，<br>
                    設計師是小我，空間才是大宇宙。 
                </p>
                <div class="artWorkBg" ref="artWorkBg"></div>
            </div>
        </div>

        <!-- Creator Area -->
        <div class="creatorArea">
            <div class="creatorContainer">
                <div class="creatorInformation">
                    <h3 data-aos="fade-right">創辦人</h3>
                    <div class="creator" data-aos="fade"><img src="~Branding/01_creator.jpg"></div>
                    <h1 data-aos="fade-right">創辦人暨設計總監<br>陳 詠婕</h1>
                    <h2 data-aos="fade-right">
                        「設計來自生活，生活因設計改變，<br>
                        回歸設計需求，以細節成就完美，彰顯本質。」<br>
                        從大型設計公司、大元建築事務所洗禮，到創辦個人公司，<br>
                        三十年設計路，紮實耕耘始終如一，<br>
                        從住宅到商業，一件件精彩作品，造就多種形式的空間表情。
                    </h2>
                    <ul>
                        <li data-aos="fade-right">1989~1991 年曾任職 優騰國際室內設計有限公司 iDA Workplace + Strategy</li>
                        <li data-aos="fade-right" data-aos-delay="200">1991~1998 年曾任職 大元聯合建築師事務所 KRIS YAO∣ARTECH</li>
                        <li data-aos="fade-right" data-aos-delay="400">1999 年成立 日騰空間設計有限公司</li>
                    </ul>
                </div>
                
                
                <div class="spacePic spacePic1" data-aos="fade-up"><img src="~Branding/01_space_1.jpg"></div>
                <div class="spacePic spacePic2" data-aos="fade-up" data-aos-delay="200"><img src="~Branding/01_space_2.jpg"></div>
                <div class="spacePic spacePic3" data-aos="fade-up" data-aos-delay="400"><img src="~Branding/01_space_3.jpg"></div>
                
            </div>
        </div>

        <!-- designConceptArea -->
        <div class="designConceptArea">
            <div class="designConceptContainer">
                <div class="pic" data-aos="fade"><img src="~Branding/02_schematicDiagram.jpg"></div>
                <div class="title">
                    <h3 data-aos="fade-left">設計<span>理念</span></h3>
                    <h1 data-aos="fade-left">生活與設計對話</h1>
                </div>
                <div class="discription">
                    <ul>
                        <li data-aos="fade-left">
                            「設計的細節可以看出設計師的意圖。」<br>
                            面對客戶與空間，我們堅持的只是一種價值觀，<br>
                            型隨機能、與時俱進，盡力改善優化，<br>
                            堅持自己的價值觀，相信美的感召力。
                        </li>
                        <li data-aos="fade-left">
                            日騰空間設計創辦人，陳總監，以美感為軸，<br>
                            空間為伍，喜愛白色系的她，在設計世界也有<br>
                            自己的白色美學，反映在設計或公司空間上，<br>
                            可見單一與多元，包容與調和，<br>
                            純粹與共生，內斂與優雅。
                        </li>
                        <li data-aos="fade-left">
                            如果說創作是天份，還有不斷的學習，<br>
                            才能累積豐沛的創造力，儘管泰半人生<br>
                            在設計領域裡，日夜追尋靈感與創意拉拔，<br>
                            然而堅韌的柔情與對設計熱情，精進淬煉無限可能。
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- collectionWorksArea -->
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

        <div class="stepArea">
            <div class="stepContainer">
                <h3 data-aos="fade-right">專案<span>流程</span></h3>
                <div class="textBox">
                    <h2 data-aos="fade-right">業主· 設計師 Q&amp;A</h2>
                    <p data-aos="fade-right">
                        溝通是成就設計的起點！執行過程我們傾聽，和業主保持交流，<br>
                        設計案每一步驟均得到業主充份的了解和認同後才執行。<br>
                        每一件設計作品的呈現,代表著每位客戶的氣質和內在涵養，<br>
                        我們期許能為客戶展現出不同層次的空間。<br>
                        歡迎與我們聊聊，邀請你到更好的生活來。
                    </p>
                </div>
                <div class="stepContent">
                    <ul>
                        <li data-aos="fade-up" data-aos-delay="100" class="cubeBlack"><h4>1</h4><p>設計師&nbsp;&nbsp;x&nbsp;&nbsp;客戶交流會談</p></li>
                        <li data-aos="fade-up" data-aos-delay="200" class="cubeWhite"><h4>2</h4><p>現場實地丈量及平面放樣</p></li>
                        <li data-aos="fade-up" data-aos-delay="300" class="cubeWhite"><h4>3</h4><p>提報空間區分建議</p></li>
                        <li data-aos="fade-up" data-aos-delay="400" class="circle"><h4>4</h4><p>平面圖簡報</p></li>
                        <li data-aos="fade-up" data-aos-delay="500" class="cubeWhite"><h4>5</h4><p>設計合約確認及成立</p></li>
                        <li data-aos="fade-up" data-aos-delay="600" class="circle"><h4>6</h4><p>立面圖簡報</p></li>
                        <li data-aos="fade-up" data-aos-delay="700" class="cubeWhite"><h4>7</h4><p>材料建議及家具建議</p></li>
                        <li data-aos="fade-up" data-aos-delay="800" class="cubeWhite"><h4>8</h4><p>施工圖繪製</p></li>
                        <li data-aos="fade-up" data-aos-delay="900" class="circle"><h4>9</h4><p>估　價</p></li>
                        <li data-aos="fade-up" data-aos-delay="1000" class="cubeWhite"><h4>10</h4><p>工程合約</p></li>
                        <li data-aos="fade-up" data-aos-delay="1100" class="cubeBlack"><h4>11</h4><p>施工執行</p></li>
                    </ul>
                    <span class="line" data-aos="fade" data-aos-delay="1200"></span>
                </div>
            </div>
            <div class="stepContentBg"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "../scss/helpers/_mixin.scss";
    @import "../scss/helpers/scrollAnimation.scss";
    @import "../scss/pages/_branding.scss";
</style>