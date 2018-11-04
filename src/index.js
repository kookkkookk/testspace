import '@babel/polyfill';
import 'es6-promise';
import 'es6-object-assign';
import Vue from 'vue'
import VueRouter from 'vue-router';
import store from './store';
import route from './route';
Vue.use(VueRouter);
const router = new VueRouter(route);
import VueScrollTo from 'vue-scrollto';
Vue.use(VueScrollTo);
import {TweenMax, Power2, TimelineLite} from 'gsap/TweenMax';

import App from 'App';
import './scss/mainInit.scss';

Vue.config.productionTip = false;
new Vue({
    el: '#app',
    router,
    store,
    render: h=>h(App)
});