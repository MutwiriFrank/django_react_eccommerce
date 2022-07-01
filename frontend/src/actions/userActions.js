import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT,
            USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
            USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_RESET, 
            USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET,
            USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_RESET, 
            USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_DELETE_REQUEST, 
            USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_RESET, 



} from '../constants/userConstants'

import { CART_CLEAR_ITEMS , CART_CLEAR_PAYMENT_METHOD, CART_CLEAR_SHIPPING_ADDRESS } from '../constants/cartConstants'
import axios from 'axios'
import { ORDERS_MY_LIST_RESET } from '../constants/orderConstants'


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/token/',
            { 'email': email, 'password': password },
            config
        )
        
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        

        localStorage.setItem('userInfo', JSON.stringify(data))
        localStorage.setItem('userInfoAccess', JSON.stringify(data.access))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const logout = () => (dispatch) =>{
    localStorage.removeItem('userInfoAccess', )
    localStorage.removeItem('userInfo', )
    localStorage.removeItem('shippingAddress', )
    localStorage.removeItem('paymentMethod', )
    localStorage.removeItem('cartItems', )

    dispatch({
        type: USER_LOGOUT
    })
    dispatch({
        type: USER_DETAILS_RESET
    })
    dispatch({
        type: ORDERS_MY_LIST_RESET
    })   
    dispatch({
        type: USER_LIST_RESET
    })
    dispatch({
        type: USER_LIST_RESET
    })  
    dispatch({
        type: CART_CLEAR_ITEMS
    })  
    dispatch({
        type: CART_CLEAR_SHIPPING_ADDRESS  
    })
    dispatch({
        type: CART_CLEAR_PAYMENT_METHOD
    }) 
    
    
}


export const register = (email, user_name, phone_number, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }     
        const { data } = await axios.post(
            '/api/users/register/',
            {  'user_name': user_name, 'email': email,'phone_number': phone_number, 'password': password}, 
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const getUserDetails = (pk) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token }`
            }
        }

        const { data } = await axios.get(
            `/api/users/${pk}/`,
            config           
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })   
    } 

}

export const updateUserProfile = (user) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token }`
            }
        }
        const { data } = await axios.put(
            `api/users/profile/update/`,
            user, 
            config           
        )
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS, 
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS, 
            payload: data
        })
        dispatch({
            type: USER_UPDATE_PROFILE_RESET, 
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data) )

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
        
    }

}

export const listUsers= () => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token }`
            }
        }

        const { data } = await axios.get(
            `/api/users/all_users/`,
            config           
        )

        dispatch({
            type: USER_LIST_SUCCESS, 
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
        
    }
}


export const deleteUser= (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token }`
            }
        }
        const { data } = await axios.delete(
            `/api/users/delete/${id}/`,
            config           
        )
        dispatch({
            type: USER_DELETE_SUCCESS, 
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
        
    }

}

export const updateUser= (user) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token }`
            }
        }
        const { data } = await axios.put(
            `/api/users/edit/${user.id}/`,
            user,
            config           
        )
        dispatch({
            type: USER_UPDATE_SUCCESS, 
        })
        dispatch({
            type: USER_DETAILS_SUCCESS, 
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
        
    }

}
