<script>
import { mapGetters } from 'vuex';
export default {
    name: 'footer-module',
    computed: {
        ...mapGetters([
            'isMobile'
        ])
    }
};
</script>
<template>
    <footer>
        <div class="footerDsktop" v-if="!isMobile">
            <div class="textArea">
                <h1><span></span></h1>
                <h2>德易空間設計有限公司</h2>
                <a href="mailto:idespacestudio@gmail.com">idespacestudio@gmail.com</a>
            </div>
            <div class="iconArea">
                <ul>
                    <li><a href="javascript:;"></a></li>
                    <li><a href="mailto:idespacestudio@gmail.com"></a></li>
                </ul>
            </div>
        </div>
        <div class="footerMobile" v-else>
            <h2>COPYRIGHT ©　IDE SPACE STUDIO</h2>
        </div>
    </footer>
</template>
<style lang="scss" scoped>
    @import "scss/helpers/_mixin.scss";
    @import "scss/common/_footer.scss";
</style>
