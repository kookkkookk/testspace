<script>
import { mapGetters } from 'vuex';
// import { mapActions } from 'vuex';
export default {
    name: 'header-module',
    data() {
        return {
            menu: [
                { path: '/home',   name: 'home',   text: 'Home'},
                { path: '/works',  name: 'works',  text: 'Works'},
                { path: '/design', name: 'design', text: 'Design'},
                { path: '/news',   name: 'news',   text: 'News'},
                { path: '/branding',  name: 'branding',  text: 'Branding'}
            ],
            isMobileMenuOpen: false,
            mobileMenuHeight: "",
            noAnimated: false
        }
    },
    computed: {
        ...mapGetters([
            'pageActive',
            'isMobile'
        ])
    },
    methods: {
        /*...mapActions([

        ])*/
        mobileMenuSwitch(){
            this.isMobileMenuOpen = !this.isMobileMenuOpen
            if(this.isMobile){
                if(this.isMobileMenuOpen){
                    this.mobileMenuHeight = "height:"+document.body.clientHeight+"px";
                }else{
                    this.mobileMenuHeight = "height:0px";
                }
            }else{
                this.mobileMenuHeight = "height:89px"; 
            }
        },
        jumpPageNoAnimatedCloseMenu(){
            if(this.isMobile){
                this.noAnimated = true
                this.mobileMenuHeight = "height:0px";
                setTimeout(() => {
                    this.noAnimated = false
                    this.isMobileMenuOpen = !this.isMobileMenuOpen
                }, 500);
            }
        },
        scrollToTop() {
            setTimeout(() => {
                window.scrollTo(0,0);
            }, 200);
        }
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                this.$store.commit('getRouter', this.$route.name)
            }
        }
    }
}
</script>

<template>
    <header>
        <div>
            <h1 class="headerLogo" :class="{'moveMid':isMobileMenuOpen && isMobile}">
                <router-link :to="menu[0].path"
                             v-if="!isMobile"
                             @click.native="mobileMenuSwitch();scrollToTop();">
                </router-link>
                <a href="javascript:;" v-else style="pointer-events:none;"></a>
            </h1>
            <div class="mobileMainMenuSwitchBtn"
                 v-if="isMobile"
                 @click="mobileMenuSwitch">
                <span :class="{'active':isMobileMenuOpen && isMobile}"></span>
                <span :class="{'active':isMobileMenuOpen && isMobile}"></span>
                <span :class="{'active':isMobileMenuOpen && isMobile}"></span>
            </div>
            <div class="mainMenu"
                 :class="{'mobileHide': !isMobileMenuOpen && isMobile,
                          'mobileShow': isMobileMenuOpen && isMobile,
                          'noAnimated': noAnimated && isMobile}"
                 :style="mobileMenuHeight">
                <ul>
                    <li v-if="isMobile">
                        <router-link :to="menu[0].path"
                                    @click.native="jumpPageNoAnimatedCloseMenu();scrollToTop();">
                            {{menu[0].text}}
                        </router-link>
                    </li>
                    <li v-for="item in menu"
                        :key="item.path"
                        v-if="item.name !== 'home'">
                        <router-link :to="{ name: item.name}"
                                     @click.native="jumpPageNoAnimatedCloseMenu();scrollToTop();">
                            {{item.text}}
                        </router-link>
                        <span></span>
                    </li>
                </ul>
                <span :class="pageActive"></span>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
    @import "../scss/helpers/_mixin.scss";
    @import "../scss/common/_header.scss";
</style>