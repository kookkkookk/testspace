export default{
    changeisMobileVal(context, data) {
        context.commit('changeisMobileVal', data)
    },
    getDocumentHeight(context, data) {
        context.commit('getDocumentHeight', data)
    },
    postScrollTopVal(context, data) {
        context.commit('postScrollTopVal', data)
    },
    runFadeOutLoading(context, data) {
        context.commit('runFadeOutLoading', data)
    }
}