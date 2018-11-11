<script>
import { mapGetters } from 'vuex';
export default {
    name: 'design',
    data() {
        return {
            discoveryDesignActive: 0,
            isDiscoveryDesignPrev: false,
            isDiscoveryDesignNext: true,
            discoveryDesignContent:[
                {
                    "title": "體貼入微，<br>不只是觀察也是感受",
                    "description": "建築大師庫哈斯：「建築是一種冒險 。」<br>室內設計則是整合思考，為人設計，<br>成立至今近二十年的時間，<br>我們從不定義自己的風格，更不盲從追求流行，<br>當設計師像明星一樣走進大眾生活，<br>我們依然默默耕耘每一件作品，<br>也許是我們的個性，也或許是我們習慣以作品發聲。",
                    "pic": "src/images/Design/01_discoveryDesignPic01.jpg"
                },
                {
                    "title": "體貼入微，<br>不只是觀察也是感受",
                    "description": "跨足商業與住宅空間，我們著眼在於生活機能與方便使用，<br>而不是空間的華麗與獨特風格，或是材質的特殊難得，<br>如果留心觀察，<br>生活中被大家長期使用、慣用的每一個穿著物件，背後都有其原因。<br>不論是對自身個性、喜好的瞭解，<br>或者深受物件的機能、美感、態度所吸引，<br>每個選擇都值得仔細探究。<br>接受設計委託案，我們習慣同步請客戶分享日常習慣與愛好，<br>作為未來設計參考與主人風格的演繹。",
                    "pic": "src/images/Design/01_discoveryDesignPic02.jpg"
                },
                {
                    "title": "生活者的樣貌，<br>比風格更重要",
                    "description": "與素材對話：<br>面對預算，不代表設計與想法就要被犧牲，<br>學習挖掘材質的替代性與變化性，只要用心入微，<br>一塊石材的紋理和豐富面貌，一塊木料，就可琢磨數十種組合方式。<br>設計師對品鑑眼光與核心價值，需要長期觀察與累積，<br>不要輕易被名牌物件牽引，空間不是物件的堆疊，<br>而是再現事物真隨中的美。<br>文藝復興藝術家米開朗基羅曾說：<br>「其實這型體本來就存在於大理石中，我只是把不需要的部分去掉而已。」",
                    "pic": "src/images/Design/01_discoveryDesignPic03.jpg"
                },
                {
                    "title": "生活者的樣貌，<br>比風格更重要",
                    "description": "給未來的創作者與居住者：<br>常常提醒公司同事，不排除任何可能與創意，<br>閱讀、看展、旅行....，訓練眼界與累積內涵，<br>不斷尋求自己的想法，才能敏銳感受世界，<br>不拘泥於創造好作品的執著，<br>全心誠意做好每件事，<br>再努力一點，那甘苦甜美與客戶肯定是忠實的。",
                    "pic": "src/images/Design/01_discoveryDesignPic04.jpg"
                }
            ]
        }
    },
    computed: {
        ...mapGetters([
            'isMobile',
            'documentHeight',
            //'getScrollTop'
        ]),
        discoveryDesignLength(){
            return this.discoveryDesignContent.length
        }
    },
    methods: {
        scrollToTop() {
            setTimeout(() => {
                window.scrollTo(0,0);
            }, 200);
        },
        changeDiscoveryDesign(active){
            //this.discoveryDesignActive = (active + this.discoveryDesignLength) % this.discoveryDesignLength
            //console.log("active: ",active)
            //console.log("this.discoveryDesignActive: ",this.discoveryDesignActive)
            if(active<=this.discoveryDesignLength && active>-1) this.discoveryDesignActive=active;
            (this.discoveryDesignActive==0 ? this.isDiscoveryDesignPrev=false : this.isDiscoveryDesignPrev=true);
            (this.discoveryDesignActive==(this.discoveryDesignLength-1) ? this.isDiscoveryDesignNext=false : this.isDiscoveryDesignNext=true)
        }
    },
    mounted(){

        //Banner animated (tweenMax)
        const { title } = this.$refs
        const { subTitle } = this.$refs
        const { description } = this.$refs
        const { artWorkBg } = this.$refs
        const { select } = this.$refs
        const timeline = new TimelineLite()
        timeline.from(title, 0.5, {opacity: 0, x: -30, delay: 0.3})
                .from([subTitle,description], 0.5, {opacity: 0, y: -10})
                .from(artWorkBg, 0.5, {opacity: 0})
                .from(select, 0.5, {opacity: 0})
    }
}
</script>

<template>
    <div class="designPage firstDom">
        <!-- news main screen -->
        <div class="designMainScreenArea pagesTopCover">
            <div>
                <h1 ref="title">DESIGN</h1>
                <!-- <div class="light"><img src="~News/00_light_desktop.png" alt=""></div> -->
                <h2 ref="subTitle">空間育人。</h2>
                <p ref="description">
                    一心一意，無比考究的用心，<br>
                    我們的設計是謙虛的，生活是內斂的。<br>
                    以空間構築現場的人際關係與心性感受， <br>
                    融合場域與居住者；平衡產品與使用者，<br>
                    型隨機能，風格不受限，<br>
                    偶爾留白，比多更能展現美的力度。
                </p>
                <div class="classificationMenu" ref="select">
                    <ul>
                        <li><a href="javascript:;">CROSSOVER</a></li>
                        <li><a href="javascript:;">ART COLLECTION</a></li>
                    </ul>
                </div>
                <div class="artWorkBg" ref="artWorkBg"></div>
            </div>
        </div>

        <!-- discoveryDesignArea -->
        <div class="discoveryDesignArea">
            <div class="discoveryDesignContainer">
                <h3>設計<span>發現</span></h3>

                <transition-group v-if="!isMobile"
                                  tag="div"
                                  name="fade"
                                  class="discoveryDesignContentGroup">
                    <div v-for="(item,index) in discoveryDesignContent"
                         :key="index"
                         class="discoveryDesignContent"
                         v-show="discoveryDesignActive===index">
                        <h1 v-html="item.title"></h1>
                        <p v-html="item.description"></p>
                        <div class="pic"><img :src="item.pic"></div>
                    </div> 
                </transition-group>

                <div class="nextBtn"
                     @click="changeDiscoveryDesign(discoveryDesignActive+1)"
                     v-show="isDiscoveryDesignNext">
                    <span></span>
                </div>
                <div class="prevBtn"
                     @click="changeDiscoveryDesign(discoveryDesignActive-1)"
                     v-show="isDiscoveryDesignPrev">
                    <span></span>
                </div>
            </div>
        </div>

        <div class="choiceArea">
            <div class="choiceContainer">
                <h3>跨界<span>選品</span></h3>
                <div class="choiceContent">
                    <div class="choiceContentLeft">
                        <div>
                            <ul>
                                <li style="background-image: url('src/images/Design/02_choicePic01.jpg'); background-position: 100% 0%;">
                                    <img src="~Design/02_choicePic01.jpg">
                                </li>
                                <li style="background-image: url('src/images/Design/02_choicePic02.jpg'); background-position: 0% 100%;">
                                    <img src="~Design/02_choicePic01.jpg">
                                </li>
                                <li style="background-image: url('src/images/Design/02_choicePic03.jpg'); background-position: 100% 0%;">
                                    <img src="~Design/02_choicePic01.jpg">
                                </li>
                                <li style="background-image: url('src/images/Design/02_choicePic04.jpg'); background-position: 100% 0%;">
                                    <img src="~Design/02_choicePic01.jpg">
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="choiceContentRight">
                        <div>
                            <h2>跨界創作。</h2>
                            <p>
                                我們熱愛並且相信自己做的事，<br>
                                設計案之餘，夥伴們喜歡旅行、看展、動手創作，<br>
                                從中汲取美學與生活養分，轉化為創意靈感。<br>
                                備受客戶喜愛的三大節的年禮，就是大家一起玩出來！<br>
                                對日騰來說，每個祝福都是獨一無二，<br>
                                從選材到搭配，甚至重新設計包材，<br>
                                每年絞盡腦汁，求新求變，<br>
                                藉由轉用與重新組合，傳達心意的重量，Only ZITON。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="yellowBg"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "../scss/helpers/_mixin.scss";
    @import "../scss/helpers/scrollAnimation.scss";
    @import "../scss/pages/_design.scss";
</style>