export default{
    getRouter(state, data){
        state.visibility = data
    },
    changeisMobileVal(state, data){
        state.isMobile = data;
    },
    postScrollTopVal(state, data){
        state.scrollTop = data;
    }
}