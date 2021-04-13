import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_DETAILS_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_ADMIN_REQUEST,
    USER_UPDATE_ADMIN_SUCCESS,
    USER_UPDATE_ADMIN_FAIL
}
    from "../constants/user";

export const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default: return state
    }
}
export const RegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default: return state
    }
}
// REDUCER FOR THE USER_DETAILS
export const userDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { loading: true }
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case USER_DETAILS_RESET:
            return { user: {} }
        default: return state
    }
}
// REDUCER FOR THE USER UPDATE
export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default: return state
    }
}
// user list reducer 
export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true }
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }
        case USER_LIST_FAIL:
            return {users:[]}
        default: return state
    }
}
// delete user by the admin
export const userDeleteByAdmin = (state = {message:{} }, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true }
        case USER_DELETE_SUCCESS:
            return { loading: false, message: action.payload }
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default: return state
    }
}
// update user by the admin
export const userUpdateByAdmin = (state = {message:{} }, action) => {
    switch (action.type) {
        case USER_UPDATE_ADMIN_REQUEST:
            return { loading: true }
        case USER_UPDATE_ADMIN_SUCCESS:
            return { loading: false,success:true, message: action.payload }
        case USER_UPDATE_ADMIN_FAIL:
            return { loading: false, error: action.payload }
        default: return state
    }
}