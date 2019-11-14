import $axios from 'axios';

const commonGetData = (whoPage) =>{
    switch (whoPage) {
        case "homePage":
            //console.log("home")
            return $axios.get('./assets/data/homeData.json');

        case "workPage":
            //console.log("work")
            return $axios.get('./assets/data/worksData.json');
        
        case "designPage":
            //console.log("design")
            return $axios.get('./assets/data/designData.json');

        case "newsPage":
            //console.log("news")
            return $axios.get('./assets/data/newsData.json');

        case "brandingPage":
            //console.log("branding")
            return $axios.get('./assets/data/brandingData.json');
    }
}

const buildDataPath = (data) => location.hostname === "localhost" ? JSON.parse(JSON.stringify(data).replace(/.\/images\//g, "src/images/")) : data ;
//只有一行並且return 可以縮寫這樣

export default{
    changeisMobileVal(context, data) {
        context.commit('changeisMobileVal', data);
    },
    getDocumentHeight(context, data) {
        context.commit('getDocumentHeight', data);
    },
    postScrollTopVal(context, data) {
        context.commit('postScrollTopVal', data);
    },
    runFadeOutLoading(context, data) {
        context.commit('runFadeOutLoading', data);
    },
    postWork_isWorkShowVal(context, data) {
        context.commit('postWork_isWorkShowVal', data);
    },

    async getHomePageData({ commit }){
        try{
            const res = await commonGetData("homePage");
            commit( "saveHomePageData", buildDataPath(res.data) );
        }catch(error){
            console.log(`!getHomePageData error`);
        }
    },
    async getWorkPageData({ commit }) {
        try {
            const res = await commonGetData("workPage");
            commit("saveWorkPageData", buildDataPath(res.data));
        } catch (error) {
            console.log(`!getWorkPageData error`);
        }
    },
    async getDesignPageData({ commit }) {
        try {
            const res = await commonGetData("designPage");
            commit("saveDesignPageData", buildDataPath(res.data));
        } catch (error) {
            console.log(`!getDesignPageData error`);
        }
    },
    async getNewsPageData({ commit }) {
        try {
            const res = await commonGetData("newsPage");
            commit("saveNewsPageData", buildDataPath(res.data));
        } catch (error) {
            console.log(`!getNewsPageData error`);
        }
    },
    async getBrandingPageData({ commit }) {
        try {
            const res = await commonGetData("brandingPage");
            commit("saveBrandingPageData", buildDataPath(res.data));
        } catch (error) {
            console.log(`!getBrandingPageData error`);
        }
    }
}