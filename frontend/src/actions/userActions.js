import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT,
         USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
         USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_RESET, 
         USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET,

} from '../constants/userConstants'
import axios from 'axios'


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
    dispatch({
        type: USER_LOGOUT
    })
    dispatch({
        type: USER_DETAILS_RESET
    })
    
}

export const register = (email, name, user_name, phone_number, password) => async (dispatch) => {
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
            { 'name': name,  'user_name': user_name, 'email': email,'phone_number': phone_number, 'password': password}, config

        )

      console.log(  'email', email, 'name', name, 'user_name', user_name, 'phone_number', phone_number, 'password', password)

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
        const { userLogin: { userInfo },  } = getState()

        const accessKey = JSON.parse(localStorage.getItem('userInfoAccess'));
        console.log(accessKey)

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${accessKey}`
            }
        }
      
        const { data } = await axios.get(
            `api/users/${pk}/`,
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
        const { userLogin: { userInfo }, } = getState()

      
        const accessKey = JSON.parse(localStorage.getItem('userInfoAccess'));
        console.log(accessKey)

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${accessKey}`
            }
        }
        console.log(config, user) 
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
