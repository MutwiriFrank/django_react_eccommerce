import axios from 'axios'

import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL , ORDER_CREATE_RESET ,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_RESET ,
    ORDERS_MY_LIST_REQUEST, ORDERS_MY_LIST_SUCCESS, ORDERS_MY_LIST_FAIL, ORDERS_MY_LIST_RESET


} from '../constants/orderConstants'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

export const createOrder = (order) => async (dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

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



    }catch (error){
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
   
}

export const getOrderDetails = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_DETAILS_REQUEST       
        })
        const accesskey = JSON.parse(localStorage.getItem('userInfoAccess'))

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${accesskey}`
            }
        }
 

        const { data } = await axios.get(`/api/store/order/${id}/`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })


    }catch(error){
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
    
}

export const payOrder = (id, paymentResult ) => async(dispatch, getState) =>{
    try{
        dispatch({
            type: ORDER_PAY_REQUEST,
        })
        const accesstoken = JSON.parse(localStorage.getItem('userInfoAccess'))

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${accesstoken}`
            }
        }
        //get data, we need headers and access
        const {data} = await axios.put(`api/store/order/${id}/pay/`,paymentResult, config )

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
        

    }catch(error){
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
    

}

export const listMyOrders = ( ) => async (dispatch, getState) =>{

    try{

    
        dispatch({
            type: ORDERS_MY_LIST_REQUEST
        })
        // identify user 

        const accesstoken = JSON.parse(localStorage.getItem('userInfoAccess'))
        console.log( 'accesstoken', accesstoken)
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${accesstoken}`
            }
        }

        // make request and get response

        const { data } = await axios.get('/api/store/order/my-orders/', config)

        dispatch({
            type: ORDERS_MY_LIST_SUCCESS,
            payload: data
        
        })

    }catch(error){
        dispatch({
            type: ORDERS_MY_LIST_FAIL,
            payload:  error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            
        })


    }



    //fetch orders
}