import {combineReducers} from 'redux'
import {productReducer,productDetalisReducer} from './postReducer'
import {cartReducer} from './CartReducer'
import {loginReducer,RegisterReducer,userDeleteByAdmin,userDetailsReducer,userListReducer,userUpdateReducer} from './user'
import {orderCreateReducer,orderDetailsReducer, orderPayReducer,orderListMyReducer} from './orderReducer'
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
    orderPay:orderPayReducer,
    orderList:orderListMyReducer,
    userList:userListReducer,
    userDelete:userDeleteByAdmin
})