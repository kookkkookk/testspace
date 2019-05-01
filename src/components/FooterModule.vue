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
                <p>T <a href="tel:+886227316282">886 2 2731 6282</a>　F 886 2 2731 6287</p>
                <p>16F-1, No.137, Sec. 1, Fuxing S. Rd., Ta-An Dist., Taipei City 106, Taiwan (R.O.C.)</p>
            </div>
            <div class="iconArea">
                <ul>
                    <li><a href="javascript:;"></a></li>
                    <li><a href="mailto:hello@zitonspace.com"></a></li>
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
