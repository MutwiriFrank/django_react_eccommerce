import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM , CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from '../constants/cartConstants'
// import { CART_ADD_ITEM, CART_REMOVE_ITEM , CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from '../constants/cartConstants'

export const addToCart =(pk, qty) => async(dispatch, getState) => {
    const {data} = await axios.get(`/api/store/product/${pk}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data.pk,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty

        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
 
export const removeFromCart = (pk)=>(dispatch, getState) =>{
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: pk
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))}


export const saveShippingAddress = (data) => (dispatch) =>{
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data) )
}

export const savePaymentMethod = (data) => (dispatch) =>{
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}

// export const createOrder = (order) => async (dispatch, getState) =>{
//     try {
//         dispatch({
//             type: SHIPPING_ADDRESS_CREATE_REQUEST
//         })
//         const {
//             userLogin: { userInfo },
//         } = getState()

//             let token = userInfo.access

//             if (!userInfo.access){
//                 token = userInfo.token
//             }


     
//         const config = {
//             headers: {
//                 'Content-type': 'application/json',
//                 Authorization : `Bearer ${userInfo.token || userInfo.access}`
//             }
//         }

//         const { data } = await axios.post(
//             `/api/store/order/add/`, 
//             order, config     
//         )

//         dispatch({  
//             type: SHIPPING_ADDRESS_CREATE_SUCCESS,
//             payload: data
//         })


//         localStorage.removeItem('cartItems') 



//     }catch (error){
//         dispatch({
//             type: SHIPPING_ADDRESS_CREATE_FAIL,
//             payload: error.response && error.response.data.detail
//                 ? error.response.data.detail
//                 : error.message,
//         })
//     }
// }


