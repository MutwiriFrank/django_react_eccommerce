import React from 'react'
import '../css/Product.css'
import Rating from './Rating.js'
import { Link } from 'react-router-dom'


function Product2({product}) {
    return (
        <div className="product">
            
            <div className='image__div'>
        
        
            <Link to={`/product/${product.pk}`}>
                <img className='product__img' src={product.image} alt={product.name} ></img>
            </Link>
            </div>
            
            <div className="product__info" >
                <div className="productName__div">
                    <Link to={`/product/${product.pk}`}>
                        <p>{(product.name).substring(0, 25)}</p>
                    </Link>
                </div>
                <div className="productPrice__div">
                    <p className="product__price" >
                        <small>Ksh</small><strong>{product.price}</strong>
                    </p>
                </div>

                {(  product.numReviews ) && (
                        
                <div className="product__rating" >
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                </div>
                )
                }


            </div>
        </div>
    )
}

export default Product2
