import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Row,Container } from 'react-bootstrap'
import Product2 from  '../components/Product2'  
import Loader from  '../components/Loader'  
import Message from  '../components/Message'  
import Paginate from  '../components/Paginate'  
import { getsubcategoryProducts } from '../actions/subcategoryProducts'
import '../css/Home.css'

function SubcategoryProductsScreen({history, match}) {

    const dispatch = useDispatch()
    const subcategoryProducts = useSelector(state => state.subcategoryProducts )
    const {error, loading, products } = subcategoryProducts


    useEffect(() => {
        
        dispatch(getsubcategoryProducts( match.params.id ))
        
    }, [dispatch, match])



    return (
        <div className="homepage homepage2">
        <Container >

        {loading   ?  <Loader /> 
            : error ?<Message  variant='danger'>{error}</Message>
                :
                <div>
                    <Row>

                        {products.map(product=>(
                            <Col className="product__col" key={product.pk} xs={6} sm={6} md={4} lg={3} xg={2} >
                            <Product2 product={product} />         
                            </Col>
                        ))}                                   
                
                    </Row>

                </div>
                
        }   
        </Container> 
        </div>
         
    )
}

export default SubcategoryProductsScreen
