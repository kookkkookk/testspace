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
                <h1><span></span>日騰空間設計有限公司</h1>
                <p>T　886 2 2751 6406　　F　886 2 2751 6315</p>
                <P>16F-1, No.137, Sec. 1, Fuxing S. Rd., Ta-An Dist., Taipei City 106, Taiwan (R.O.C.)</P>
            </div>
            <div class="iconArea">
                <ul>
                    <li><a href="javascript:;"></a></li>
                    <li><a href="javascript:;"></a></li>
                </ul>
            </div>
        </div>
        <div class="footerMobile" v-else>
            <h2>COPYRIGHT © 2018 ZITONSPACE</h2>
        </div>
    </footer>
</template>
<style lang="scss" scoped>
    @import "../scss/helpers/_mixin.scss";
    @import "../scss/common/_footer.scss";
</style>
