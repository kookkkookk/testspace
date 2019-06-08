export default {
    getRouter(state, data) {
        state.visibility = data
    },
    changeisMobileVal(state, data) {
        state.isMobile = data;
    },
    getDocumentHeight(state, data) {
        state.documentHeight = data;
    },
    postScrollTopVal(state, data) {
        state.scrollTop = data;
    },
    runFadeOutLoading(state, data) {
        state.isRunFadeOutLoadIcon = data;
    },
    postWork_isWorkShowVal(state, data) {
        state.workPage_isWorkShow = data;
    },

    saveHomePageData(state, data) {
        state.homeData = data;
    },
    saveWorkPageData(state, data) {
        state.worksData = data;
    },
    saveDesignPageData(state, data) {
        state.designData = data;
    },
    saveNewsPageData(state, data) {
        state.newsData = data;
    },
    saveBrandingPageData(state, data) {
        state.brandingData = data;
    },
}