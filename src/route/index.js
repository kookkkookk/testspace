import home from "Home"
import works from "Works";
import workPopup from "WorkPopup";
import design from "Design";
import news from "News";
import newsPopup from "NewsPopup";
import branding from "Branding";

// const home = resolve => require(['Home'], resolve);
// const works = resolve => require(['Works'], resolve);
// const workPopup = resolve => require(['WorkPopup'], resolve);
// const design = resolve => require(['Design'], resolve);
// const news = resolve => require(['News'], resolve);
// const newsPopup = resolve => require(['NewsPopup'], resolve);
// const branding = resolve => require(['Branding'], resolve);

export default {
    mode: 'hash',
    routes: [
        { path: '/home',         name: 'home',      component: home },
        { path: '/works',        name: 'works',     component: works},
        { path: '/work/:userId', name: 'workPopup', component: workPopup },
        { path: '/design',       name: 'design',    component: design },
        { path: '/news',         name: 'news',      component: news },
        { path: '/news/:userId', name: 'newsPopup', component: newsPopup },
        { path: '/branding',     name: 'branding',  component: branding},
        { path: '*',             redirect: '/home'}
    ]
}