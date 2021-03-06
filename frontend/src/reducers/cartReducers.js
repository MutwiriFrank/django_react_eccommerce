import { saveShippingAddress } from '../actions/cartActions'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS , CART_SAVE_PAYMENT_METHOD, CART_CLEAR_ITEMS, 
    CART_CLEAR_SHIPPING_ADDRESS, CART_CLEAR_PAYMENT_METHOD}  from '../constants/cartConstants'

export const cartReducer = (state = {cartItems:[], shippingAddress: {} }, action) => {
    switch (action.type){
        case CART_ADD_ITEM :
            const item =  action.payload 
            const  existitem =  state.cartItems.find(x => x.product === item.product)

            
            if(existitem){
            // check if an item already exist in the cart
                return{
                    ...state, // return the original state and change cart items(state.cartItems)
                    cartItems: state.cartItems.map(x => x.product === existitem.product ? item : x )
                }

            }else{
                
            //add pproduct to cart
                return{
                    ...state, 
                    cartItems:[...state.cartItems, item]
                }
            }

        case CART_REMOVE_ITEM :
            //remove item
            return {
                ...state, cartItems: state.cartItems.filter(x => x.product !== action.payload )
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return{
                ...state,
                shippingAddress: action.payload
            }
        case CART_CLEAR_SHIPPING_ADDRESS:
            return{
                ...state, 
                shippingAddress: {}
            }

        case CART_SAVE_PAYMENT_METHOD:
            return{
                ...state, 
                paymentMethod: action.payload
            }

        case CART_CLEAR_PAYMENT_METHOD:
            return{
                ...state, 
                paymentMethod: {}
            }


        case CART_CLEAR_ITEMS:
            return{
                ...state, 
                cartItems: []
            }

        default:
        return state


    }


}