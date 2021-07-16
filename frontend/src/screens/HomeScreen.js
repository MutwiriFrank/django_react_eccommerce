import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from  '../components/Product'  
import Loader from  '../components/Loader'  
import Message from  '../components/Message'  
import { listProducts } from '../actions/productActions'
  
function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList )
    const {error, loading, products } = productList

    useEffect(() => {
        dispatch(listProducts())
        
    }, [dispatch])



    return (
        <div>
            <h3>Baby Products</h3>

            {loading   ?  <Loader /> 
                : error ?<Message  variant='danger'>{error}</Message>
                    :
                    <Row>
                    {products.map(product=>(
                        <Col key={product.pk} sm={6} md={3} lg={2} xg={2} >
                        <Product product={product} />         
                        </Col>

                    ))}
                    
                </Row> 

            }

            
        </div>
    )
}

export default HomeScreen
