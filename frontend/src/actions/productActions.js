import axios from 'axios'
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS , PRODUCT_LIST_FAIL,
        PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS , PRODUCT_DETAILS_FAIL,
        PRODUCT_DELETE_REQUEST,  PRODUCT_DELETE_SUCCESS , PRODUCT_DELETE_FAIL,
        PRODUCT_CREATE_REQUEST,  PRODUCT_CREATE_SUCCESS , PRODUCT_CREATE_FAIL, 
        PRODUCT_EDIT_REQUEST,  PRODUCT_EDIT_SUCCESS , PRODUCT_EDIT_FAIL, 
        PRODUCT_REVIEW_CREATE_REQUEST,  PRODUCT_REVIEW_CREATE_SUCCESS , PRODUCT_REVIEW_CREATE_FAIL,
        TOP_PRODUCT_LIST_REQUEST, TOP_PRODUCT_LIST_SUCCESS , TOP_PRODUCT_LIST_FAIL,


        } from '../constants/productConstants'


export const listProducts = (keyword = '') => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_LIST_REQUEST })

        const {data} = await axios.get(`/api/store/${keyword} `)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data  
        })

    } catch (error) {
    dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
    })
    }

}

export const listProductDetails = (pk) => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_DETAILS_REQUEST })

        const {data} = await axios.get(`/api/store/product/${pk}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data   
        })

    } catch (error) {
    dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
    })
    }
}


export const deleteProduct = (pk) => async(dispatch, getState ) => {
    try{
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        })
        //identify user and send data
        const {
            userLogin: { userInfo },
        } = getState()

     
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.delete(`/api/store/product/delete/${pk}/`, config)

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data
        })


    }catch(error){
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
    
        })

    }
}

export const productCreateAction = (name, price, description, countInStock, dealer, category, image) => async (dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

     
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }   
        const { data } = await axios.post(
            '/api/store/product/create/', 
            { "name": name, "price": price, "description": description, "countInStock": countInStock,
                        "dealer": dealer, "category": category, "image": image}, 
            config
        )

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
        })


    }catch(error){
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const productEditAction = (product) => async (dispatch, getState) =>{
    try{
        dispatch({
            type: PRODUCT_EDIT_REQUEST
        })
        const {
            userLogin: { userInfo },
        } = getState()

     
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(
            `/api/store/product/edit/${product.pk }/`, product, config
        )
    
        dispatch({
            type: PRODUCT_EDIT_SUCCESS,
            
        })

    }catch(error){
        dispatch({
            type: PRODUCT_EDIT_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message
        
        
        })
    }
}

export const productCreateReview = ( productId, review) => async (dispatch, getState) => {
    try {

        dispatch({
            type: PRODUCT_REVIEW_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

     
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        
        const { data } = await axios.post(`/api/store/product/${productId}/review/`, review, config)
        
        dispatch({
            type: PRODUCT_REVIEW_CREATE_SUCCESS,
            payload: data
        })

        
    } catch (error) {
        dispatch({
            type: PRODUCT_REVIEW_CREATE_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message
        })
    }
}

export const topProductsAction = () => async (dispatch) => {
    try{
        dispatch({
            type: TOP_PRODUCT_LIST_REQUEST,      
        })
        const {data} = await axios.get(`/api/store/top_products/`)

        dispatch({
            type: TOP_PRODUCT_LIST_SUCCESS,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: TOP_PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message
        })
        
    }
}