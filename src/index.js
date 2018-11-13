import "./scss/mainInit.scss";

import '@babel/polyfill';
import 'es6-promise';
import 'es6-object-assign';
import Vue from 'vue'
import VueRouter from 'vue-router';
import store from './store';
import route from './route';
Vue.use(VueRouter);
const router = new VueRouter(route);
import axios from 'axios'
Vue.prototype.$axios = axios;
//import VueAxios from 'vue-axios'
//Vue.use(VueAxios, axios)
import VueScrollTo from 'vue-scrollto';
Vue.use(VueScrollTo);
//import {TweenMax, Power2, TimelineLite} from 'gsap/TweenMax';
import TweenMax from "gsap/TweenMax";
import "./scss/tools/aos2.3.4.css";
import aos from "aos";
Vue.prototype.$aos = aos;
import App from 'App';
import 'swiper/dist/css/swiper.css';


Vue.config.productionTip = false;
new Vue({
    el: '#app',
    router,
    store,
    render: h=>h(App)
});