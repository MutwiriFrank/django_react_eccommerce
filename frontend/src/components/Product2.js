import React from 'react'
import '../css/Product.css'
import Rating from './Rating.js'
import { Link } from 'react-router-dom'


function Product2({product}) {
    return (
        <div className="product">
            
            <Link to={`/product/${product.pk}`}>
                <img src={product.image} alt={product.name} ></img>
            </Link>
            
            <div className="product__info" >
                <div className="productName__div">
                    <Link to={`/product/${product.pk}`}>
                        <p>{product.name}</p>
                    </Link>
                </div>
                <div className="productPrice__div">
                    <p className="product__price" >
                        <small>Ksh</small><strong>{product.price}</strong>
                    </p>
                </div>
                        
                <div className="product__rating" >
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                </div>


            </div>
        </div>
    )
}

export default Product2
