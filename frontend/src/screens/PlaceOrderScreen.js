import React, { useState, useEffect } from 'react'
import { ListGroup,Table, Button, Row, Col, Image, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'


function PlaceOrderScreen() {
    const cart = useSelector(state=>state.cart)
    const { cartItems } = cart
    cart.ItemsPrice =  cartItems.reduce((acc, item ) => acc + item.qty * item.price, 0 )
   
    cart.shippingFee = 200

    const  placeOrder = () => {
        console.log('place order')
    }

    return ( 
        <div>
            <CheckoutSteps step1 step2 step3 step4 />

            <Row>
                <Col md={8}>
                    <ListGroup>
                        <ListGroup.Item >
                            <h2>Delivery</h2>
                            <p>
                                <strong>Shipping:   </strong>
                                {cart.shippingAddress.city } {cart.shippingAddress.estate} {cart.shippingAddress.road}
                                {cart.shippingAddress.landmark} {cart.shippingAddress.phone}

                            </p>

                        </ListGroup.Item>

                    </ListGroup>

                    <ListGroup>
                        <ListGroup.Item >
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method:   </strong>
                                {cart.paymentMethod } 
                            </p>

                        </ListGroup.Item>

                    </ListGroup>

                    <ListGroup>
                       

                        <Table  bordered hover size="sm">
                            <thead>
                                <tr>
                                <th></th>
                                <th>Image</th>
                                <th > Name</th>
                                <th>Quantity</th>
                                <th> Price</th>
                                <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>
                                        <Col >
                                            <Image src={item.image} alt={item.name} fluid  />
                                        </Col>
                                        
                                        </td>
                                        <td>{item.name}</td>
                                        <td >{item.qty}</td>
                                        <td>{item.price}</td>  
                                        <td>{item.price * item.qty}</td>
                                    </tr>
                                  
                                    
                                ))}
                                <tr >
                                    <td colSpan="5"><strong>Total</strong>  </td>
                                    <td>{ cart.ItemsPrice}</td>
                                </tr>
                            
                            </tbody>
                        </Table>

                    </ListGroup>
                   
                </Col>
                

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                            
                                    <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                    <Row>
                                        <Col>Item Total</Col>
                                        <Col>Ksh {cart.ItemsPrice}</Col>
                                    </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                    <Row>
                                        <Col>Delivery fee</Col>
                                        <Col>Ksh {cart.shippingFee}</Col>
                                    </Row>

                            </ListGroup.Item>
                            <ListGroup.Item>
                                     <Row>
                                        <Col>Total</Col>
                                        <Col>Ksh  {cart.ItemsPrice+ cart.shippingFee} </Col>
                                    </Row>

                            </ListGroup.Item>
                            <ListGroup.Item>
                                    <Row>
                                        <Button
                                            type = 'button'
                                            className = 'btn-block'
                                            disabled = {cart.cartItems === 0 }
                                            onClick= {placeOrder}
                                        >
                                        
                                        Place Order</Button>
                                    </Row>

                            </ListGroup.Item>
                        </ListGroup>
                        
                    </Card>

                </Col>
            </Row>
            
        </div>
    )
}

export default PlaceOrderScreen
