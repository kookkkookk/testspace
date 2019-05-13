export default {
    isMobile: state => {
        return state.isMobile;
    },
    pageActive: state => {
        return state.visibility;
    },
    documentHeight: state => {
        return state.documentHeight;
    },
    getScrollTop: state => {
        return state.scrollTop;
    },
    getIsRunFadeOutLoadIcon: state => {
        return state.isRunFadeOutLoadIcon;
    },
    getWork_isWorkShow: state => {
        return state.workPage_isWorkShow;
    }
}