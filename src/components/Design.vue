<script>
export default {
    name: 'design',
    data() {
        return {
            discoveryDesignActive: 0,
            discoveryDesign:[
                {
                    //將discovery Design 改用data方式，不然太白癡了
                }
            ]
        }
    },
    computed: {
        discoveryDesignLength(){
            return 4;
        }
    },
    methods: {
        scrollToTop() {
            setTimeout(() => {
                window.scrollTo(0,0);
            }, 200);
        },
        changeDiscoveryDesign(active){
            this.discoveryDesignActive = (active + this.discoveryDesignLength) % this.discoveryDesignLength
        }
    }
}
</script>

<template>
    <div class="designPage firstDom">
        <!-- news main screen -->
        <div class="designMainScreenArea pagesTopCover">
            <div>
                <h1>DESIGN</h1>
                <!-- <div class="light"><img src="~News/00_light_desktop.png" alt=""></div> -->
                <h2>空間育人。</h2>
                <p>
                    一心一意，無比考究的用心，<br>
                    我們的設計是謙虛的，生活是內斂的。<br>
                    以空間構築現場的人際關係與心性感受， <br>
                    融合場域與居住者；平衡產品與使用者，<br>
                    型隨機能，風格不受限，<br>
                    偶爾留白，比多更能展現美的力度。
                </p>
                <div class="classificationMenu" ref="select">
                    <ul>
                        <li><a href="javascript:;">CHOICE</a></li>
                        <li><a href="javascript:;">ARTWORK</a></li>
                    </ul>
                </div>
                <div class="artWorkBg"></div>
            </div>
        </div>

        <!-- discoveryDesignArea -->
        <div class="discoveryDesignArea">
            <div class="discoveryDesignContainer">
                <h3>設計<span>發現</span></h3>

                <div class="discoveryDesignContentGroup">
                    <!-- 0 -->
                    <div class="discoveryDesignContent"
                         :class="{active:discoveryDesignActive===0}">
                        <h1>1體貼入微，<br>不只是觀察也是感受</h1>
                        <p>
                            建築大師庫哈斯：「建築是一種冒險 。」<br>
                            室內設計則是整合思考，為人設計，<br>
                            成立至今近二十年的時間，<br>
                            我們從不定義自己的風格，更不盲從追求流行，<br>
                            當設計師像明星一樣走進大眾生活，<br>
                            我們依然默默耕耘每一件作品，<br>
                            也許是我們的個性，也或許是我們習慣以作品發聲。
                        </p>
                        <div class="pic"><img src="~Design/01_discoveryDesignPic01.jpg"></div>
                    </div>

                    <!-- 1 -->
                    <div class="discoveryDesignContent"
                         :class="{active:discoveryDesignActive===1}">
                        <h1>2體貼入微，<br>不只是觀察也是感受</h1>
                        <p>
                            建築大師庫哈斯：「建築是一種冒險 。」<br>
                            室內設計則是整合思考，為人設計，<br>
                            成立至今近二十年的時間，<br>
                            我們從不定義自己的風格，更不盲從追求流行，<br>
                            當設計師像明星一樣走進大眾生活，<br>
                            我們依然默默耕耘每一件作品，<br>
                            也許是我們的個性，也或許是我們習慣以作品發聲。
                        </p>
                        <div class="pic"><img src="~Design/01_discoveryDesignPic02.jpg"></div>
                    </div>

                    <!-- 2 -->
                    <div class="discoveryDesignContent"
                         :class="{active:discoveryDesignActive===2}">
                        <h1>3體貼入微，<br>不只是觀察也是感受</h1>
                        <p>
                            建築大師庫哈斯：「建築是一種冒險 。」<br>
                            室內設計則是整合思考，為人設計，<br>
                            成立至今近二十年的時間，<br>
                            我們從不定義自己的風格，更不盲從追求流行，<br>
                            當設計師像明星一樣走進大眾生活，<br>
                            我們依然默默耕耘每一件作品，<br>
                            也許是我們的個性，也或許是我們習慣以作品發聲。
                        </p>
                        <div class="pic"><img src="~Design/01_discoveryDesignPic03.jpg"></div>
                    </div>

                    <!-- 3 -->
                    <div class="discoveryDesignContent"
                         :class="{active:discoveryDesignActive===3}">
                        <h1>4體貼入微，<br>不只是觀察也是感受</h1>
                        <p>
                            建築大師庫哈斯：「建築是一種冒險 。」<br>
                            室內設計則是整合思考，為人設計，<br>
                            成立至今近二十年的時間，<br>
                            我們從不定義自己的風格，更不盲從追求流行，<br>
                            當設計師像明星一樣走進大眾生活，<br>
                            我們依然默默耕耘每一件作品，<br>
                            也許是我們的個性，也或許是我們習慣以作品發聲。
                        </p>
                        <div class="pic"><img src="~Design/01_discoveryDesignPic04.jpg"></div>
                    </div>

                </div>

                <div class="nextBtn" @click="changeDiscoveryDesign(discoveryDesignActive+1)"><span></span></div>
                <div class="prevBtn" @click="changeDiscoveryDesign(discoveryDesignActive-1)"><span></span></div>
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
                                    <img src="src/images/Design/02_choicePic01.jpg">
                                </li>
                                <li style="background-image: url('src/images/Design/02_choicePic02.jpg'); background-position: 0% 100%;">
                                    <img src="src/images/Design/02_choicePic01.jpg">
                                </li>
                                <li style="background-image: url('src/images/Design/02_choicePic03.jpg'); background-position: 100% 0%;">
                                    <img src="src/images/Design/02_choicePic01.jpg">
                                </li>
                                <li style="background-image: url('src/images/Design/02_choicePic04.jpg'); background-position: 100% 0%;">
                                    <img src="src/images/Design/02_choicePic01.jpg">
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