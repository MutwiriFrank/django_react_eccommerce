import { SUBCATEGORY_ITEMS_LIST_REQUEST, SUBCATEGORY_ITEMS_LIST_SUCCESS, SUBCATEGORY_ITEMS_LIST_FAIL } from '../constants/subcategoryproductsConstants'
import axios from 'axios'


export const listProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: SUBCATEGORY_ITEMS_LIST_REQUEST })

        const {data} = await axios.get(`/api/store/subcategory/${id}`)

        dispatch({
            type: SUBCATEGORY_ITEMS_LIST_SUCCESS,
            payload: data   
        })

    } catch (error) {
    dispatch({
        type: SUBCATEGORY_ITEMS_LIST_FAIL,
        payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
    })
    }
}