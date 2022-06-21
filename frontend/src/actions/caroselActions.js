import { PRODUCT_CAROSEL_REQUEST, PRODUCT_CAROSEL_SUCCESS, PRODUCT_CAROSEL_FAIL } from '../constants/caroselConstants'
import axios from 'axios'


export const getCaroselProducts = () => async (dispatch) => {
try{
    dispatch({ type: PRODUCT_CAROSEL_REQUEST })

    const {data} = await axios.get('/api/store/carosel/')

    dispatch({ 
        type: PRODUCT_CAROSEL_SUCCESS,
        payload : data
    
    })
    

}catch(error){
    dispatch({ 
        type: PRODUCT_CAROSEL_FAIL,
        error: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message, 

    })

}

}