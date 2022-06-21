import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Row,Container } from 'react-bootstrap'
import Product from  '../components/Product'  
import Product2 from  '../components/Product2'  
import Loader from  '../components/Loader'  
import Message from  '../components/Message'  
import Paginate from  '../components/Paginate'  
import ProductCarousel from  '../components/ProductCarosel'  
import TopCategories from  '../components/TopCategories'  
import { listProducts } from '../actions/productActions'
import '../css/Home.css'


function SearchResults({ history }) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList )
    const {error, loading, products, page, pages } = productList

    let keyword = history.location.search

    useEffect(() => {
        
        dispatch(listProducts( keyword ))
        
    }, [dispatch, keyword])

    return (
        <div>
            {!keyword &&  <ProductCarousel /> }
            {!keyword &&  <TopCategories /> }

        <Container>

            {loading   ?  <Loader /> 
                : error ?<Message  variant='danger'>{error}</Message>
                    :
                    <div>
                        <Row>
                            

                            {products.map(product=>(
                                <Col key={product.pk} xs={6} sm={6} md={4} lg={3} xg={2} >
                                <Product2 product={product} />         
                                </Col>
                            ))}  
                            {products.map(product=>(
                                <Col key={product.pk} xs={6} sm={6} md={4} lg={3} xg={2} >
                                <Product2 product={product} />         
                                </Col>
                            ))}                
                        </Row> 
                        <Paginate page={page} pages={pages} keyword={keyword} />
                    </div>
                    
            }   
            </Container>   
        </div>
    )
}

export default SearchResults
