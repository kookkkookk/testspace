export default{
    isMobile: state=>{
        return state.isMobile;
    },
    pageActive: state=> {
        return state.visibility;
    },
    documentHeight: state => {
        return state.documentHeight;
    },
    getScrollTop: state=> {
        return state.scrollTop;
    }
    
}