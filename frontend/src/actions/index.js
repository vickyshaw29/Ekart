import axios from 'axios'
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS } from '../constants/products'
export const listProducts=()=>async dispatch=>{
    try {
        dispatch({type:'PRODUCT_LIST_REQUEST'})
        const data=await axios.get('http://localhost:8000/api/products/')
        dispatch({type:'PRODUCT_LIST_SUCCESS',payload:data})
    } catch (error) {
        dispatch({type:"PRODUCT_LIST_FAIL",payload:error.response&&error.response.data.error?error.response.data.error:error.error})
    }
}
export const detailsProduct=(id)=>async dispatch=>{
    try {
        dispatch({type:'PRODUCT_DETAILS_REQUEST'})
        const data=await axios.get(`http://localhost:8000/api/product/${id}`)
        dispatch({type:'PRODUCT_DETAILS_SUCCESS',payload:data})
    } catch (error) {
        dispatch({type:"PRODUCT_DETAILS_FAIL",payload:error})
    }
}
// deleting products by the admin
export const deleteProduct=(id)=>async (dispatch,getState)=>{
    try {
        dispatch({type:PRODUCT_DELETE_REQUEST})
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}=await axios.delete(`http://localhost:8000/api/admin/product/${id}`,config)
        dispatch({type:PRODUCT_DELETE_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:PRODUCT_DELETE_FAIL,payload:error})
    }
}
// creating product by the admin
export const createProduct=()=>async (dispatch,getState)=>{
    try {
        dispatch({type:PRODUCT_CREATE_REQUEST})
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}=await axios.post(`http://localhost:8000/api/create/product`,{},config)
        dispatch({type:PRODUCT_CREATE_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:PRODUCT_CREATE_FAIL,payload:error})
    }
}