import home from "../components/Home"
import works from "../components/Works";
import design from "../components/Design";
import news from "../components/News";
import brand from "../components/Brand";
export default {
    mode: 'hash',
    routes: [
        { path: '/home',   name: 'home',   component: home },
        { path: '/works',  name: 'works',  component: works},
        { path: '/design', name: 'design', component: design},
        { path: '/news',   name: 'news',   component: news},
        { path: '/brand',  name: 'brand',  component: brand},
        { path: '*',       redirect: '/home'}
    ]
}