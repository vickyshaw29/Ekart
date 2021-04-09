import axios from 'axios'
import { ORDER_CREATE_FAIL,ORDER_CREATE_SUCCESS, ORDER_CREATE_REQUEST, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL } from "../constants/order"

export const createOrder=(order)=>async (dispatch,getState)=>{
    try {
        dispatch({
            type:ORDER_CREATE_REQUEST
        })
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}=await axios.post('http://localhost:8000/api/order',order,config)
        console.log(data,"data from actions")
        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload:error
        })

    }
}
// details about the order 
export const getOrderDetails=(id)=>async (dispatch,getState)=>{
    try {
        dispatch({
            type:ORDER_DETAILS_REQUEST
        })
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}=await axios.get(`http://localhost:8000/api/order/${id}`,config)
        // console.log(data,"data from actions")s
        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error
        })

    }
}

// details of the whether the payment is done or not
export const payOrder=(orderId,paymentResult)=>async (dispatch,getState)=>{
    try {
        dispatch({
            type:ORDER_PAY_REQUEST
        })
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}=await axios.put(`http://localhost:8000/api/order/${orderId}/pay`,paymentResult,config)
        console.log(data,"data from actions")
        dispatch({
            type:ORDER_PAY_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ORDER_PAY_FAIL,
            payload:error
        })

    }
}