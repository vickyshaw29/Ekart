import axios from "axios"
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS, 
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST,
     USER_LOGIN_SUCCESS, 
     USER_LOGOUT,
      USER_REGISTER_FAIL,
       USER_REGISTER_REQUEST, 
       USER_REGISTER_SUCCESS, 
       USER_UPDATE_ADMIN_FAIL, 
       USER_UPDATE_ADMIN_REQUEST, 
       USER_UPDATE_ADMIN_SUCCESS, 
       USER_UPDATE_FAIL, 
       USER_UPDATE_REQUEST, 
       USER_UPDATE_SUCCESS
} from "../constants/user"
import { USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS} from '../constants/user'
import { ORDER_LIST_MY_RESET } from '../constants/order'
export const login = (email, password) => async dispatch => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.post('http://localhost:8000/api/signin', { email, password }, config)
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL, payload:
                error.response.data.error
        })
    }
}
export const userLogout = () => dispatch => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT },)
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
    dispatch({ type: USER_LIST_RESET })
}
export const register = (name, email, password) => async dispatch => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.post('http://localhost:8000/api/signup', { name, email, password }, config)
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL, payload:
                error.response.data.error
        })
    }
}
// ACTION TO FETCH DETAILS OF A PARTICULAR USER
export const getUserDetails = (id, token) => async dispatch => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.get(`http://localhost:8000/api/user/${id}`, config)
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
        localStorage.setItem('userdetails', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL, payload:
                error.response.data.error
        })
    }
}
// ACTION FOR UPDATING THE USER
export const updateUserDetails = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`http://localhost:8000/api/user/${userInfo.user._id}`, user, config)
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: { token: userInfo.token, user: data } })
        localStorage.setItem('userInfo', JSON.stringify({ token: userInfo.token, user: data }))
    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_UPDATE_FAIL, payload:
                error
        })
    }
}
// getting all the users from backend
export const listUsers = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`http://localhost:8000/api/users/${id}`, config)
        // console.log(data, "data from actions")
        dispatch({ type: USER_LIST_SUCCESS, payload: data })
    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_LIST_FAIL, payload:
                error
        })
    }
}
// deleting any user by admin 
export const deleteUserAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${userInfo.token}`,
                id:id
            }
        }
        const {data}=await axios.delete(`http://localhost:8000/api/admin/user/${userInfo.user._id}`,config,)
        dispatch({ type: USER_DELETE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: USER_DELETE_FAIL, payload:error})
    }
}
// update any user by the admin
export const updateUserActionByAdmin = (id,user) => async (dispatch, getState) => {
    try {
        dispatch({ type:USER_UPDATE_ADMIN_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${userInfo.token}`,
                id:id,
            }
        }
        const {data}=await axios.put(`http://localhost:8000/api/admin/user/${userInfo.user._id}`,user,config,)
        dispatch({ type:USER_UPDATE_ADMIN_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type:USER_UPDATE_ADMIN_FAIL, payload:error})
    }
}