import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS , PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS , PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_RESET,
    PRODUCT_DELETE_REQUEST,  PRODUCT_DELETE_SUCCESS , PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,  PRODUCT_CREATE_RESET,  PRODUCT_CREATE_SUCCESS , PRODUCT_CREATE_FAIL,
    PRODUCT_EDIT_REQUEST,  PRODUCT_EDIT_SUCCESS , PRODUCT_EDIT_FAIL, PRODUCT_EDIT_RESET,
    PRODUCT_REVIEW_CREATE_REQUEST,  PRODUCT_REVIEW_CREATE_SUCCESS , PRODUCT_REVIEW_CREATE_FAIL, PRODUCT_REVIEW_CREATE_RESET,
    TOP_PRODUCT_LIST_REQUEST, TOP_PRODUCT_LIST_SUCCESS , TOP_PRODUCT_LIST_FAIL,
} from '../constants/productConstants'



export  const productListReducers = (state = {products :[]}, action) =>{
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: []}

        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload.products, page: action.payload.page, pages: action.payload.pages }

        case PRODUCT_LIST_FAIL:
            
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productDetailsReducers = (state = {product: {review:[]} }, action) =>{
    switch (action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true, ...state}
        
        case PRODUCT_DETAILS_SUCCESS: 
            return {loading: false, product : action.payload}

        case PRODUCT_DETAILS_RESET: 
            return {product:{}}

        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload}

            default:
                return state

    }
}

export const productDeleteReducer = (state={}, action) => {
    switch (action.type){
        case PRODUCT_DELETE_REQUEST:
            return {loading:true}
        case PRODUCT_DELETE_SUCCESS:
            return {loading:false, success:true}
        case PRODUCT_DELETE_FAIL:
            return {loading:false, error:action.payload }
        default:
            return state
    }
}

export const productCreateReducer = (state={}, action) => {
    switch (action.type){
        case PRODUCT_CREATE_REQUEST:
            return {loading:true}
        case PRODUCT_CREATE_SUCCESS:
            return {loading:false, success:true, product: action.payload}
        case PRODUCT_CREATE_FAIL:
            return {loading:false, error:action.payload }  
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const productEditReducer = (state={}, action) => {
    switch (action.type){
        case PRODUCT_EDIT_REQUEST:
            return {loading:true}
        case PRODUCT_EDIT_SUCCESS:
            return {loading:false, success:true}
        case PRODUCT_EDIT_FAIL:
            return {loading:false, error:action.payload }  
        case PRODUCT_EDIT_RESET:
            return { product: {}}
        default:
            return state
    }
}

export const productReviewCreateReducer = (state={}, action) => {
    switch (action.type){
        case PRODUCT_REVIEW_CREATE_REQUEST:
            return {loading: true}

        case PRODUCT_REVIEW_CREATE_SUCCESS:
            return {
                loading : false,
                success:true,
            }

        case PRODUCT_REVIEW_CREATE_FAIL:
            return {
                loading : false,
                error: action.payload
            }
        case PRODUCT_REVIEW_CREATE_RESET:
            return { }
        default:
            return state
    }
}


export  const topProductListReducers = (state = {topProducts :[]}, action) =>{
    switch (action.type) {
        case TOP_PRODUCT_LIST_REQUEST:
            return {loading: true, topProducts: []}

        case TOP_PRODUCT_LIST_SUCCESS:
            return {loading: false, 
                topProducts: action.payload
            }

        case TOP_PRODUCT_LIST_FAIL:
            
            return { 
                loading: false, 
                error: action.payload 
            }

        default:
            return state
    }
}
