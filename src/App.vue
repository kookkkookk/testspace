<script>
//import { mapGetters } from 'vuex';
import HeaderModule from 'common/HeaderModule';
import FooterModule from 'common/FooterModule';
import LoadingModule from 'common/LoadingModule';
export default {
    name: 'app',
    components: {
        HeaderModule,
        FooterModule,
        LoadingModule
    },
    computed: {
        
    },
    methods: {
        getDocumentHeight(){
            //this.$store.commit('getDocumentHeight', document.body.clientHeight)
            this.$store.dispatch('getDocumentHeight', document.body.clientHeight);
            
        },
        onResize() {
            //console.log("onResize clientWidth: ",document.body.clientWidth)
            if(document.body.clientWidth<=736){
                //this.$store.commit('changeisMobileVal', true)
                this.$store.dispatch('changeisMobileVal', true);
            }else{
                //this.$store.commit('changeisMobileVal', false)
                this.$store.dispatch('changeisMobileVal', false);
            }
        },
        handleScroll() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            var windowHeight = document.body.clientHeight
            //console.log("scrollTop: ",scrollTop+windowHeight)
            //this.$store.commit('postScrollTopVal', scrollTop+windowHeight)
            this.$store.dispatch('postScrollTopVal', scrollTop + windowHeight);

            /*var offsetTop = document.querySelector('.lifeStyleArea').offsetTop;
            console.log("LifeStyleArea offsetTop: ",offsetTop)
            if(scrollTop<=200){
                offsetTop = 300 - Number(scrollTop);
                document.querySelector('#searchBar').style.top = offsetTop+'px';
            }else{
                document.querySelector('#searchBar').style.top = '100px';
            }*/
        }
    },
    mounted() {
        window.addEventListener('resize', this.onResize)

        //first load init
        this.onResize()
        this.getDocumentHeight();

        //scroll
        window.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll)
    }
}
</script>

<template>
    <div id="app">
        <loading-module></loading-module>
        
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
    transition: opacity 0.35s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>