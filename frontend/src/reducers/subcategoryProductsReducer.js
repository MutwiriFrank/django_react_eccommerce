import { SUBCATEGORY_ITEMS_LIST_REQUEST, SUBCATEGORY_ITEMS_LIST_SUCCESS, SUBCATEGORY_ITEMS_LIST_FAIL } from '../constants/subcategoryproductsConstants'

export const subcategoryProductsReducer = (state= { products: []}, action) => {
    switch (action.type){
        case SUBCATEGORY_ITEMS_LIST_REQUEST:
            return {loading: true, products: []}

        case SUBCATEGORY_ITEMS_LIST_SUCCESS:
            return {loading: false, products: action.payload }

        case SUBCATEGORY_ITEMS_LIST_FAIL:
            
            return { loading: false, error: action.payload }

        default:
            return state

    }
}