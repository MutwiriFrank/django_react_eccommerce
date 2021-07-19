import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Row, Image, ListGroup , Card, Button, Form } from 'react-bootstrap'

import { listProductDetails } from '../actions/productActions'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'



function ProductScreen({match, history}) {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.pk))
        
    }, [dispatch, match] )

    const addToCartHandler = () =>{
     
        history.push(`/cart/${match.params.pk}?qty=${qty}`)
    }

    return (
       
        <div>
            <Link to={'/'} className="btn btn-light my-3">Go Back</Link>
            {loading ?  <Loader /> 
                : error ? <Message variant="danger">{error}</Message>
                  :(
                    <Row>
                        <Col xs={12}  md={4}>
                            <Image src={product.image} alt={product.name} fluid/>
                        </Col>
                        <Col md={4}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h4>{product.name}</h4>
                                </ListGroup.Item>
                                
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews `}  color={'#f8e825'}/>

                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: Ksh{product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>

                            </ListGroup>
                            
                        </Col>
                        <Col md={1}>

                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Price
                                            </Col>
                                            <Col>
                                                <strong>Ksh {product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Status
                                            </Col>
                                            
                                            <Col>
                                                {product.countInStock > 0 ? 'In Stock': 'Out of Stock'}
                                                
                                            </Col>
                                    </Row>
                                    </ListGroup.Item>
                                    
                                        {product.countInStock > 0   && 
                                         
                                           <ListGroup.Item> 
                                               <Row>
                                                    <Col>Quantity</Col>
                                                    <Col xs='auto' className='my-1'>
                                                    <Form.Control
                                                        className="form-select"

                                                        as="select"
                                                        value={qty}
                                                        onChange={(e)=>setQty(e.target.value)}
                                                    >
                                                       {    // array constructor
                                                           [...Array(product.countInStock).keys()].map((x) =>(
                                                               <option key={x+1} value={x+1}>
                                                                   {x+1}
                                                               </option>
                                                           ))
                                                       }
                                                        
                                                    </Form.Control>
                                                    
                                                    </Col>
                                               </Row>
                                               
                                            </ListGroup.Item>
                                    
                                        }

                                    <ListGroup.Item>
                                        <Button 
                                            onClick={addToCartHandler}
                                            className="btn-block " 
                                            disabled={product.countInStock === 0} 
                                            type="button" 
                                        >Add to Cart</Button>
                                    </ListGroup.Item>

                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                  )
               }


        </div>
     
    )
}

export default ProductScreen
 