export default{
    isMobile: state=>{
        return state.isMobile;
    },
    pageActive: state=> {
        return state.visibility;
    },
    getScrollTop: state=> {
        return state.scrollTop;
    }
}