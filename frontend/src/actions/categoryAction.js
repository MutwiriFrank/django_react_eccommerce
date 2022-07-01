import axios from 'axios'

import { CATEGORIES_LIST_REQUEST, CATEGORIES_LIST_SUCCESS, CATEGORIES_LIST_FAIL,
        ROOM_CATEGORIES_LIST_REQUEST, ROOM_CATEGORIES_LIST_SUCCESS, ROOM_CATEGORIES_LIST_FAIL

} from '../constants/categoryConstants'


export const listCategories = () => async(dispatch)=> {
    try{
        dispatch({ type: CATEGORIES_LIST_REQUEST
        })
        const {data} = await axios.get('/api/store/categories/')
        console.log("data", data)

        dispatch({ 
            type: CATEGORIES_LIST_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({ 
            type: CATEGORIES_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }

}


export const listRoomCategories = () => async(dispatch)=> {
    try{
        dispatch({ type: ROOM_CATEGORIES_LIST_REQUEST
        })
        const {data} = await axios.get('/api/store/rooms/')

        dispatch({ 
            type: ROOM_CATEGORIES_LIST_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({ 
            type: ROOM_CATEGORIES_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }

}