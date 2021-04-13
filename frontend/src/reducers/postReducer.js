import { PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET } from "../constants/products"

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case "PRODUCT_LIST_REQUEST":
            return { loading: true, products: [] }
        case "PRODUCT_LIST_SUCCESS":
            return { loading: false, products: action.payload.data }
        case "PRODUCT_LIST_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const productDetalisReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case "PRODUCT_DETAILS_REQUEST":
            return { loading: true, product: [] }
        case "PRODUCT_DETAILS_SUCCESS":
            return { loading: false,success:true, product: action.payload.data }
        case "PRODUCT_DETAILS_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const productDeleteReducer = (state = { message: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true }
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, message: action.payload }
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default: return state
    }
}
// CREATE REDUCER BY THE ADMIN
export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false,success:true, product: action.payload }
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_RESET:
            return {}
        default: return state
    }
}