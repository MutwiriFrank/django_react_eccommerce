import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Row, Image, ListGroup , Button, Form } from 'react-bootstrap'

import { listProductDetails, productCreateReview } from '../actions/productActions'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {  PRODUCT_REVIEW_CREATE_RESET, AJAX_PRODUCT_LIST_RESET} from '../constants/productConstants'

import '../css/ProductDetails.css'



function ProductScreen({match, history}) {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { loading: loadingReviewCreate, success:successReviewCreate, error: errorReviewCreate,} = productReviewCreate
    
    dispatch({type: AJAX_PRODUCT_LIST_RESET})

    useEffect(() => {
        dispatch({ type: PRODUCT_REVIEW_CREATE_RESET})
        if(successReviewCreate){
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_REVIEW_CREATE_RESET})
        }
        dispatch(listProductDetails(match.params.pk))
        
    }, [dispatch, match, successReviewCreate ] )

    const addToCartHandler = () =>{

        history.push(`/cart/${match.params.pk}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(productCreateReview(match.params.pk, {rating, comment}))
    }

    return (

        <div>
            
            {!product && <Message variant="danger">Product is not found</Message>  }


            {loading ?  <Loader /> 
                : error ? <Message variant="danger">{error}</Message>
                :(
                    <div >
                    {console.log(product.category)}

                    <Row className="image_Details_description_Row">
                        <Col sm={10}  md={5} className="image__column">
                            <Image className="product_detailsImage" src={product.image} alt={product.name} fluid/>
                        </Col>
                        
                        
                        <Col className="mobile_col_description" sm={10} md={6}>
                        
                            <div className="product__DetailsDiv">
                                    <p className="product__name" >{product.name}</p>
                                    <hr />
                                    <p className="product-price" >ksh<strong>{product.price }</strong></p>
                                                                 
                                    <Rating value={product.rating} text={`${product.numReviews} reviews `}  color={'#f8e825'}/>

                                    <Row className="quantity_row" >
                                        <Col className="product__quantity" >
                                            <p>Select Quantity</p>
                                        </Col>
                                        <Col xs='auto' >
                                        <Form
                                            as="select"
                                            value={qty}
                                            onChange={(e)=>setQty(e.target.value)}
                                            className="quantity_input"

                                        >
                                        {    // array constructor
                                                [...Array(product.countInStock).keys()].map((x) =>(
                                                    <option key={x+1} value={x+1}>
                                                        {x+1}
                                                    </option>
                                                ))
                                            }
                                            
                                        </Form>
                                        
                                        </Col>
                                    </Row>

                                    <hr />
                                    
                            </div>
                            <div className="button__div">
                                    
                                <Button 
                                    onClick={addToCartHandler}
                                    className='btn-block Add_to_cart_button'
                                    disabled={product.countInStock === 0} 
                                    type="button" 
                                    variant="danger"
                                ><p className="Add_to_cart_button_text">Add to Cart</p></Button>
                            </div>   
                            
                            <p className="description_heading" >Description</p>
                            <div>
                                <p className="description" >{product.description}</p>
                            </div>                      
                        </Col>
                        
                    </Row>
                    

                    <Row className="second_row">

                        <Col sm={12} md={5}>                          
                            { product.review.length === 0 && <Message variant="info" >This item has no  reviews</Message>  }

                            {loadingReviewCreate && <Loader />}
                            {successReviewCreate  && <Message variant="success" >Review Submitted.</Message> }

                            {errorReviewCreate  && <Message variant="danger" >{errorReviewCreate}</Message> }

                            {}
                    
                            <ListGroup variant="flush" >
                                <div className="create__reviewDiv">
                                    <p className="subtitle" >Review this Product</p>
                                    {  userInfo ? (
                                        <Form onSubmit={ submitHandler } >
                                            <Form.Group controlId='rating' > 
                                                <Form.Label className="rating__label" >Rating</Form.Label>
                                                <Form.Control
                                                required
                                                as="select"
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value) }  
                                                className="input_form"                                              
                                                >
                                                    <option value='' className="rating__label"  > Select Rating..</option>
                                                    <option value='1' className="rating__label"  > 1 - poor </option>
                                                    <option value='2' className="rating__label"  > 2 - Fair </option>
                                                    <option value='3' className="rating__label"  > 3 - Good </option>
                                                    <option value='4' className="rating__label" > 4 - Very Good </option>
                                                    <option value='5' className="rating__label"  > 5 - Excellent </option>
                                                    
                                                </Form.Control>

                                            </Form.Group>

                                            <Form.Group controlId='review' >
                                                <Form.Group>
                                                    <Form.Label className="rating__label" >Review</Form.Label>
                                                    <Form.Control
                                                    required
                                                        as='textarea'
                                                        row='5'
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value) }
                                                        className="rating__label" 
                                                    >
                                                    </Form.Control>
                                                </Form.Group>
                                                
                                            </Form.Group>

                                            <Button 
                                                className = "review_button"
                                                disabled={loadingReviewCreate}
                                                type='submit'
                                                variant='info'
                                            >Submit</Button>

                                        </Form>
                                    ) : (
                                        <p> <Link to={"/login"} >Login</Link>  to review this product</p>
                                    )}
                                    
                                </div>
                        
                            </ListGroup>
                        </Col>

                        <Col sm={12} md={7} className="" >
                        <p className="Reviews_title">Reviews</p>


                            {product.review.map((review) => (
                                <div key={review.id} className="reviews" >
                                    <p className="review-content">{review.name}</p> 
                                    <Rating  value={review.rating } color='#f8e825' />
                                    <p>{review.comment}</p>
                                    <hr />
                                </div>
                            ) )}
                        
                        </Col>


                    </Row>
                    <Row>
                    <div className="div__addButton">
                        <button 
                            onClick={addToCartHandler}
                            className=' addTo__cart '
                            disabled={product.countInStock === 0} 
                            type="button" 
                        >Add to Cart</button>
                    </div>
                    
                    </Row>
                    </div>
                    )
                }


        </div>
    )
}

export default ProductScreen
