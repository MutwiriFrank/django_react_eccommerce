import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart  } from '../actions/cartActions'

function CartScreen({ match, location, history }) {
    const productId = match.params.pk
    const qty = location.search ? Number(location.search.split('=')[1]) : 1 // spliting url at = and chosing the second index and assign it to qty else qty is assigned to 1
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (pk) =>{  
        dispatch(removeFromCart(pk))
    }

    const checkoutHandler = ( ) =>{
        history.push('/login?redirect=delivery')
    }

    return ( 
        <Row>
            <Col md={9}>
                <h1>Shopping Cart</h1>
                {cartItems.length !== 0  &&
                     <Message><Link to='/'>Continue shopping</Link></Message>
                } 

                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>

                                        <Col md={2}>
                                            Ksh {item.price}
                                        </Col>

                                        <Col md={3} xs='auto' className='my-1'>
                                            <Form.Control
                                                className = 'form-select'
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                            >
                                                {

                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }

                                            </Form.Control>
                                        </Col>
                                        <Col md={1} >
                                            Ksh {item.qty * item.price}
                                        
                                        </Col>
                                        <Col md={1} >
                                            <Button
                                                type= 'button'
                                                variant= 'light'
                                                onClick = {()=>removeFromCartHandler(item.product)}
                                            >
                                             <i className='fa fa-trash' style={{color:"red", fontSize:"19px" }}></i>

                                            </Button>
                                        
                                        </Col>
                                        

                                       
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
            </Col>

            <Col md={3}>
                <Card className="subtotal-card">
                    <ListGroup variant='flush'>
                             <ListGroup.Item>
                                 <h4>Total Cost</h4> 
                               
                                 
                                 <h5>Ksh  { cartItems.reduce((acc, item ) => acc + item.qty * item.price, 0 ) }</h5>
                                 <p> For <strong>{ cartItems.reduce((acc, item ) => acc + item.qty, 0 ) }</strong> Items in cart</p>
                             </ListGroup.Item>
                    </ListGroup>
                    <ListGroup>
                        <Button
                            type='button'
                            className='btn-block m-3'
                            disabled = {cartItems.length === 0}
                            onClick = {checkoutHandler}
                        > Proceed to checkout

                        </Button>
                    </ListGroup>
                </Card>
             
            </Col>
        </Row>
    )
}

export default CartScreen     