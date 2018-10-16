<script>
//import { mapGetters } from 'vuex';
import HeaderModule from 'components/HeaderModule';
import FooterModule from 'components/FooterModule';
export default {
    name: 'app',
    components: {
        HeaderModule,
        FooterModule
    },
    computed: {

    },
    methods: {
        onResize(){
            //console.log("onResize clientWidth: ",document.body.clientWidth)
            if(document.body.clientWidth<=736){
                this.$store.commit('changeisMobileVal', true)
                this.mobileMenuHeight = "height:0px"
            }else{
                this.$store.commit('changeisMobileVal', false)
                this.mobileMenuHeight = "height:89px"
            }
        }
    },
    mounted() {
        window.addEventListener('resize', this.onResize)

        //first load init
        this.onResize()
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    }
}
</script>

<template>
    <div id="app">
        <header-module></header-module>
        
        <transition name="fade"
                    mode="out-in">
            <router-view></router-view>
        </transition>

        <footer-module></footer-module>
    </div>
</template>

<style lang="scss" scoped>
#app{
    background-color: #d3d3d3;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>