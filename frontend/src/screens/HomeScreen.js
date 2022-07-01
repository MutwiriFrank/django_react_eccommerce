import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
import { Col, Row,Container } from 'react-bootstrap'
import Product2 from  '../components/Product2'  
import TopProducts from  '../components/TopProducts'  
import Loader from  '../components/Loader' 
import Footer from '../components/Footer' 
import Message from  '../components/Message'   
import Paginate from  '../components/Paginate'  
import ProductCarousel from  '../components/ProductCarosel'  
import TopCategories from  '../components/TopCategories'  
import { listProducts, } from '../actions/productActions'

import '../css/Home.css'


function HomeScreen({ history, match }) {
    
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList )
    const {error, loading, products, page, pages } = productList

    let keyword = history.location.search



    useEffect(() => {
        
        dispatch(listProducts( keyword ))
        
    }, [dispatch, keyword])


    return (
        <div className="homepage">
            {!keyword &&  <ProductCarousel /> }
            {!keyword &&  <TopCategories /> }

        <Container>

            {loading   ?  <Loader /> 
                : error ?<Message  variant='danger'>{error}</Message>
                    :
                    <div >
                        {!keyword &&  <TopProducts /> }
                    
                        { !keyword && (
                            <div className="offer__div">
                        <Row className="offer_row" >
                                
                                <Col  xs={8} sm={7} md={7} className=" offer__info" >
                                    <div className="offer__info" >
                                        <p className="offer_textOne">Big Sale Deal</p>
                                        <p className="offer_textTwo"> Save 40% this week</p>
                        
                                    </div>

                                </Col>
                                <Col  xs={4} sm={5} md={5} className="offer__image " >
                                    
                                    <img src="images/playstation.jpg" alt="ps" ></img>
                                
                                </Col>                                                
                        </Row>
                        </div>
                        )}

                        <Row>
                            <p className="top__productsHeading" >All Products
                            </p>

                            {products.map(product=>(
                                <Col className="product__col" key={product.pk} xs={6} sm={6} md={4} lg={3} xg={2} >
                                <Product2 product={product} />         
                                </Col>
                            ))}  

                        </Row> 

                    <Paginate page={page} pages={pages} keyword={keyword} />
                    

                    </div>
                    
            }   
            </Container>   
            <Footer />
        </div>
    )
}

export default HomeScreen
