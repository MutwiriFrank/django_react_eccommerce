import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart  } from '../actions/cartActions'
import '../css/Cart.css'

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
            <Col md={8} classme="cart_itemsList">
                <div className="your__cartDiv" >
                    <p className="your__cart" >Your Cart</p> 
                </div>
                
               

                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                        <div>
                            {cartItems.map(item => (
                                <div key={item.product}>
                                    <Row>
                                        <Col xs={2}  >
                                        <Link to={`/product/${item.product}`}><Image className="cart__image" src={item.image} alt={item.name}
                                            fluid rounded /></Link>
                                        </Col>
                                        <Col xs={2} className="cart__ItemDetails" >
                                            <Link to={`/product/${item.product}`}><small>{item.name}</small></Link>
                                        </Col>

                                        <Col xs={2} className="cart__ItemDetails" >
                                            <p> {item.price * 1}</p> 
                                        </Col>

                                        <Col xs={2} className=''>
                                            <Form
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                                className="quantity_input"
                                            >
                                                {

                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                        <option className="quantity"  key={x + 1} value={x + 1} >
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }

                                            </Form>
                                        </Col>
                                        <Col xs={2} className="cart__ItemDetails" > 
                                           <p>{item.qty * item.price} </p> 
                                        
                                        </Col>
                                        <Col xs={1} >
                                            <button
                                                className="remove_button"
                                                onClick = {()=>removeFromCartHandler(item.product)}
                                                
                                            >
                                            <p>x</p>

                                            </button>
                                        
                                        </Col>                   
                                    </Row>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    )}

                    {cartItems.length !== 0  &&
                        <Message><span className="continue__shoping"><Link to='/'>Continue shopping</Link></span></Message>
                    } 
            </Col>

            <Col md={4}>
                <Card className="subtotal-card">
                    
                        
                            <p className="subtitle">Total Cost</p> 
                        
                            <div>
                                <p>Ksh <strong>{ cartItems.reduce((acc, item ) => acc + item.qty * item.price, 0 ) }  </strong> </p>
                                <p> For <strong>{ cartItems.reduce((acc, item ) => acc + item.qty, 0 ) }</strong> Items in cart</p>
                            
                            </div>
                            
                            <Button
                                type='button'
                                
                                className='registration_button'
                                disabled = {cartItems.length === 0}
                                onClick = {checkoutHandler}
                            > checkout

                            </Button>
                   
                </Card>        
            </Col>
        </Row>
    )
}

export default CartScreen     