import React, { useState, useEffect } from 'react'
import { ListGroup,Table, Button, Row, Col, Image, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import {createOrder} from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'


function PlaceOrderScreen({history}) {
    const orderCreate = useSelector(state => state.orderCreate)
    const {order , error, success} = orderCreate
 
    const payment = localStorage.getItem('paymentMethod') 
    ? JSON.parse(localStorage.getItem('paymentMethod')) 
    : {}
    
    const dispatch = useDispatch()
    const cart = useSelector(state=>state.cart)
    const { cartItems } = cart
    cart.ItemsPrice =  cartItems.reduce((acc, item ) => acc + item.qty * item.price, 0 )
    cart.shippingFee = 200
    cart.totalPrice = (Number(cart.ItemsPrice) + Number(cart.shippingFee))
  
    if(!payment){
        history.push('/payment')

    }

   
    useEffect (() =>{
        if(success){
            console.log(4)
            history.push(`/order/${order.id}`)
            dispatch({ type:ORDER_CREATE_RESET })
        }
    },[success, history])
    

    const  placeOrder = () => {
        dispatch( createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: payment,
            ItemsPrice: cart.ItemsPrice,
            shippingFee: cart.shippingFee,
            totalPrice: cart.totalPrice

        }) )
     
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
                                {payment} 
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
                                    {error && <Message vvariant='danger' >{error}</Message>}

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
