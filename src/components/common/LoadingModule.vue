<script>
import { mapGetters } from 'vuex';
const timeline = new TimelineLite();
export default {
    name: 'LoadingModule',
    data() {
        return {
            isShowLoadIcon: true
        }
    },
    computed: {
        ...mapGetters([
            // 'pageActive',
            'getIsRunFadeOutLoadIcon'
        ])
    },
    methods: {
        // switchPageReOpenLoading(){
        //     const { _loading } = this.$refs;
        //     this.isShowLoadIcon = true;
        //     timeline.to(_loading, 0.3, {autoAlpha: 1})
        //             .add(()=>{
        //                 this.$store.dispatch('runFadeOutLoading', false);
        //             });
        // },
        closeLoading(){
            const { _loading } = this.$refs;
            /*timeline.to(_loading, 0.3, {autoAlpha: 0})
                    .add(()=>{
                        // this.$store.dispatch('runFadeOutLoading', false)
                        timeline.set(_loading, {autoAlpha: 1})
                        // this.isShowLoadIcon = false;
                    })*/
            _loading.className += " close";
            setTimeout(() => {
                this.isShowLoadIcon = false;
                //_loading.classList.remove("close");
            }, 300);
        },
        openLoading(){
            const { _loading } = this.$refs;
            this.isShowLoadIcon = true;
            _loading.classList.remove("close");
            setTimeout(() => {
                this.closeLoading();
                this.$store.dispatch('runFadeOutLoading', true)
            }, 300);
            
        }
    },
    watch: {
        // pageActive(){
        //     console.log("pageActive: ",this.pageActive);
        //     this.switchPageReOpenLoading();
        // },
        getIsRunFadeOutLoadIcon(){
            if(this.getIsRunFadeOutLoadIcon){
                //console.log("Run animation close loading");
                this.closeLoading();
            }else{
                //console.log("Run open loading");
                this.openLoading();
            }
        }
    },
    mounted() {
        // this.isShowLoadIcon = true;
        // this.$store.dispatch('runFadeOutLoading', false);
    },
}
</script>
<template>
    <div class="_loading" ref="_loading" v-show="isShowLoadIcon">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
</template>
<style lang="scss" scoped>
    //loading bg style
    ._loading{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba($color: #ededed, $alpha: 0.75);
        z-index: 20;
        text-align: center;
        transition: opacity 0.3s;
    }
    ._loading.close{
        opacity: 0;
    }
    //loading animated
    .lds-ring {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 64px;
        margin-top: 200px;
    }
    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 51px;
        height: 51px;
        margin: 6px;
        border: 6px solid rgb(68, 68, 68);
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #444 transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
