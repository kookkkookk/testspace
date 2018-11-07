<script>
export default {
    name: 'design',
    data() {
        return {
            discoveryDesignContent: 1
        }
    },
    methods: {
        scrollToTop() {
            setTimeout(() => {
                window.scrollTo(0,0);
            }, 200);
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
                        <li><a href="javascript:;">SHOICE</a></li>
                        <li><a href="javascript:;">ARTWORK</a></li>
                    </ul>
                </div>
                <div class="artWorkBg"></div>
            </div>
        </div>

        <div class="discoveryDesignArea">
            <div class="discoveryDesignContainer">
                <h3>設計<span>發現</span></h3>
                <div class="discoveryDesignContentGroup">
                    <div class="discoveryDesignContent" data-design="0">
                        <h1>體貼入微，<br>不只是觀察也是感受</h1>
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
                </div>
                <div class="nextBtn"><span></span></div>
                <div class="prevBtn"><span></span></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "../scss/helpers/_mixin.scss";
    @import "../scss/helpers/scrollAnimation.scss";
    @import "../scss/pages/_design.scss";
</style>

