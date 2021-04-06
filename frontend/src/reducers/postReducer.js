export const productReducer = (state = { products:[] }, action) => {
    switch (action.type) {
        case "PRODUCT_LIST_REQUEST":
            return { loading: true, products: [] }
        case "PRODUCT_LIST_SUCCESS":
            return { loading: false, products: action.payload.data}
        case "PRODUCT_LIST_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const productDetalisReducer = (state = { products: {reviews:[] } }, action) => {
    switch (action.type) {
        case "PRODUCT_DETAILS_REQUEST":
            return { loading: true, products: [] }
        case "PRODUCT_DETAILS_SUCCESS":
            return { loading: false, products: action.payload.data}
        case "PRODUCT_DETAILS_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}