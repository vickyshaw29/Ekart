import {combineReducers} from 'redux'
import {productReducer,productDetalisReducer} from './postReducer'
import {cartReducer} from './CartReducer'
import {loginReducer,RegisterReducer,userDetailsReducer,userUpdateReducer} from './user'
import {orderCreateReducer,orderDetailsReducer, orderPayReducer} from './orderReducer'
export default combineReducers({
    productList:productReducer,
    productDetails:productDetalisReducer,
    cart:cartReducer,
    userLogin:loginReducer,
    userRegister:RegisterReducer,
    userDetails:userDetailsReducer,
    userUpdate:userUpdateReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer
})