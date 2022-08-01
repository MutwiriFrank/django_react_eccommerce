import React, {useEffect} from 'react'
import {  topProductsAction } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Product2 from  '../components/Product2'  
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Col, Row,Container } from 'react-bootstrap'

import '../css/Home.css'


function TopProducts() {

    const dispatch = useDispatch()

    const top_Products = useSelector(state => state.topProducts )
    const {error, loading, topProducts,  } = top_Products

    useEffect(() => {
        
        dispatch(topProductsAction() )
        
    }, [dispatch,])

    return (

        <div>
      
        { loading ? <p></p>: error ? <Message variant='danger' >{error}</Message> : (
            <Row>
                <p className="top__productsHeading" >Top Products</p>

                {topProducts.map(product=>(
                    <Col className="product__col" key={product.pk} xs={6} sm={6} md={4} lg={3} xg={2} >
                    <Product2 product={product} />         
                    </Col>
                ))}  
                            
            </Row> 


        )}
        </div>
       
    )
}

export default TopProducts
