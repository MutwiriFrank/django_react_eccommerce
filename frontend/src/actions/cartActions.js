import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'

export const addToCart =(pk, qty) => async(dispatch, getState) => {
    const {data} = await axios.get(`/api/store/product/${pk}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data.pk,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty

        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}