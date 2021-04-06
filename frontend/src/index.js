import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './bootstrap.min.css'
import {Provider} from 'react-redux'
import {createStore,applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import App from './components/App'
const cartItemsFromStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const userInfoFromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null

const initialState={
    cart:{
        cartItems:cartItemsFromStorage,
    },
    userLogin:{userInfo:userInfoFromStorage}
}
const composeEnhances=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;
const store=createStore(reducers,initialState ,composeEnhances(applyMiddleware(thunk)))
ReactDOM.render(
    <Provider store={store}>
            <App/>
    </Provider>,
    document.getElementById('root')
)