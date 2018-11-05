<script>
export default {
    name: 'design',
    data() {
        return {
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
    </div>
</template>

<style lang="scss" scoped>
    @import "../scss/helpers/_mixin.scss";
    @import "../scss/helpers/scrollAnimation.scss";
    @import "../scss/pages/_design.scss";
</style>

