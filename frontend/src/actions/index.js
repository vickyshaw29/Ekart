import axios from 'axios'
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