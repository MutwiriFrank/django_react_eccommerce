import axios from 'axios'

import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL , ORDER_CREATE_RESET } from '../constants/orderConstants'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

export const createOrder = (order) => async (dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })
        const { userLogin: { userInfo },  } = getState()

        const accessKey = JSON.parse(localStorage.getItem('userInfoAccess'));
        

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${accessKey}`
            }
        }
      
        const { data } = await axios.post(
            `/api/store/order/add/`, 
            order, config     
        )
   
       dispatch({  
           type: ORDER_CREATE_SUCCESS,
           payload: data
       })

       dispatch({  
            type: ORDER_CREATE_RESET,
            payload: data
        })

        dispatch({  
            type: CART_CLEAR_ITEMS,
            payload: data
        })


        localStorage.removeItem('cartItems') 



    }catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })

    }
}