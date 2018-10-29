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
                { path: '/brand',  name: 'brand',  text: 'Brand'}
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
//window.scrollTo(0,0);
</script>

<template>
    <header>
        <div>
            <h1 class="headerLogo" :class="{'moveMid':isMobileMenuOpen && isMobile}">
                <router-link :to="menu[0].path"
                             @click.native="mobileMenuSwitch"
                             v-scroll-to="'body'">
                </router-link>
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
                          'mobileShow': isMobileMenuOpen && isMobile}"
                 :style="mobileMenuHeight">
                <ul>
                    <li v-if="isMobile">
                        <router-link :to="menu[0].path"
                                    @click.native="mobileMenuSwitch"
                                    v-scroll-to="'body'">
                            {{menu[0].text}}
                        </router-link>
                    </li>
                    <li v-for="item in menu"
                        :key="item.path"
                        v-if="item.name !== 'home'">
                        <router-link :to="{ name: item.name}"
                                     @click.native="mobileMenuSwitch"
                                     v-scroll-to="'body'">
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