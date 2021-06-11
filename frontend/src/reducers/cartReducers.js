import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = {cartItems:[]}, action) => {
    switch (action.type){
        case CART_ADD_ITEM :
            const item =  action.payload 
            const  existitem =  state.cartItems.find(x => x.product === item.product)

            
            if(existitem){
            // check if an item already exist in the cart
                return{
                    ...state,
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

        default:
        return state

          
    }
   
        
  
      
}