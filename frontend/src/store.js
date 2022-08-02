import { createStore , combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { categoryListReducer, RoomCategoryListReducer} from './reducers/categoryReducer'
import { subcategoryProductsReducer, categoryProductsReducer } from './reducers/subcategoryProductsReducer' 


import { productListReducers, ajaxProductListReducers, productDetailsReducers, productDeleteReducer, productCreateReducer,
        productEditReducer, productReviewCreateReducer, topProductListReducers} from './reducers/productReducers' 
import { cartReducer} from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, 
    userDeleteReducer, userUpdateReducer, forgetPasswordReducer, resetPasswordReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, listOrdersReducer,
    orderDeliverReducer } from './reducers/OrderReducers' 

import { caroselReducer } from './reducers/caroselReducers'

const reducer = combineReducers({
        productList: productListReducers,
        ajaxProductList: ajaxProductListReducers,
        productDetails : productDetailsReducers,
        subcategoryProducts : subcategoryProductsReducer,
        categoryProducts: categoryProductsReducer,
        productDelete: productDeleteReducer,
        productCreate: productCreateReducer,
        productEdit : productEditReducer,
        productReviewCreate : productReviewCreateReducer,
        categories : categoryListReducer,
        cart : cartReducer,
        carosel : caroselReducer, 
        topProducts: topProductListReducers,
        rooms: RoomCategoryListReducer,

        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        userUpdateProfile: userUpdateProfileReducer, 
        userList: userListReducer,
        userDelete: userDeleteReducer,
        userUpdate: userUpdateReducer,

        orderCreate  : orderCreateReducer,
        orderDetails : orderDetailsReducer,
        orderPay : orderPayReducer,
        myOrders : orderListMyReducer,
        listAllOrders : listOrdersReducer,
        orderDeliver : orderDeliverReducer,

        passwordForget : forgetPasswordReducer,
        passwordReset : resetPasswordReducer,

})

const cartItemsFromStorage = localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : []

const userInfoFromStorage = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
? JSON.parse(localStorage.getItem('shippingAddress'))
: {}

const initialState = {
    cart: {cartItems : cartItemsFromStorage,
        shippingAddress : shippingAddressFromStorage,
    
    },
    userLogin : {userInfo : userInfoFromStorage},
}


const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store