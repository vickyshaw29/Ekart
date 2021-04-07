import {combineReducers} from 'redux'
import {productReducer,productDetalisReducer} from './postReducer'
import {cartReducer} from './CartReducer'
import {loginReducer,RegisterReducer,userDetailsReducer,userUpdateReducer} from './user'
export default combineReducers({
    productList:productReducer,
    productDetails:productDetalisReducer,
    cart:cartReducer,
    userLogin:loginReducer,
    userRegister:RegisterReducer,
    userDetails:userDetailsReducer,
    userUpdate:userUpdateReducer
})