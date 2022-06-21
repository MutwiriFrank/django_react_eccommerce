import { PRODUCT_CAROSEL_REQUEST, PRODUCT_CAROSEL_SUCCESS, PRODUCT_CAROSEL_FAIL } from '../constants/caroselConstants'

export const caroselReducer = (state = { caroselItems: [] }, action) => {
    switch (action.type){
        case PRODUCT_CAROSEL_REQUEST:
            return {
                loading: true, caroselItems: []
            }
        case PRODUCT_CAROSEL_SUCCESS:
            return {
                loading: false,
                success: true,
                caroselItems: action.payload
            }  
        case PRODUCT_CAROSEL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        

        default:
            return state
    }
}