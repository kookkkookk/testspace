import home from "../components/Home"
import works from "../components/Works";
import workPopup from "../components/WorkPopup";
import design from "../components/Design";
import news from "../components/News";
import newsPopup from "../components/NewsPopup";
import brand from "../components/Brand";

// const NewsPopPage = { template: "<div>NewsPopPage {{ $route.params.id }}</div>" };
// import newsData from "../assets/data/newsData.json";
// let pathObj = {path:"",component: NewsPopPage };
// let newsChildren = [];
// for (var i = 0; i < newsData.length; i++){
//     newsChildren.push( pathObj );
//     newsChildren[i].path = newsData[i].urlChildernName;
// }
//console.log(newsChildren);

export default {
    mode: 'hash',
    routes: [
        { path: '/home',         name: 'home',   component: home },
        { path: '/works',        name: 'works',  component: works},
        { path: '/work/:userId', name: 'workPopup', component: workPopup },
        { path: '/design',       name: 'design', component: design },
        { path: '/news',         name: 'news',   component: news },
        { path: '/news/:userId', name: 'newsPopup',   component: newsPopup },
        { path: '/brand',        name: 'brand',  component: brand},
        { path: '*',             redirect: '/home'}
    ]
}