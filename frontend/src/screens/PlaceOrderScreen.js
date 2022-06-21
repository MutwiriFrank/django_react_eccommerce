import React, { useState, useEffect } from 'react'
import { ListGroup,Table, Button, Row, Col, Image, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import {createOrder} from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import '../css/PlaceOrder.css'

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
            history.push(`/order/${order.id}`)
            // dispatch({ type:ORDER_CREATE_RESET })
        }
    },[success, history, dispatch, order])
    

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

    return error ? (
        <Message>{error}</Message>
    ) :
    
    ( 
        <div>
            <CheckoutSteps step1 step2 step3 step4 />

            <Row>
            <ListGroup>                  

            <Table responsive className='table-sm placeOrder_table' bordered hover size="sm">
                <thead>
                    <tr>
                    <th></th>
                    <th className="table_subtitle">Image</th>
                    <th className="table_subtitle"> Name</th>
                    <th className="table_subtitle"> Quantity</th>
                    <th className="table_subtitle"> Price</th>
                    <th className="table_subtitle">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.cartItems.map((item, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td className="image_td">
                            
                                <Image src={item.image} alt={item.name} fluid  />                                      
                            
                            </td>
                            <td className="ordinary_p" >{item.name}</td>
                            <td className="ordinary_p" >{item.qty}</td>
                            <td className="ordinary_p" >{item.price * 1}</td>  
                            <td className="ordinary_p" >{item.price * item.qty}</td>
                        </tr>
                      
                        
                    ))}
                    <tr >
                        <td colSpan="5"><strong>Total</strong>  </td>
                        <td>{ cart.ItemsPrice}</td>
                    </tr>
                
                </tbody>
            </Table>

        </ListGroup>
            
            </Row>

            <Row>
                <Col md={7}>
                    <ListGroup>
                        <ListGroup.Item >
                            <p className="subtitle" >Delivery</p>
                                                        
                                <p className="ordinary_p"  >
                                    <strong>Address:   </strong>
                                    {cart.shippingAddress.city } {cart.shippingAddress.estate} {cart.shippingAddress.road}
                                    {cart.shippingAddress.landmark} {cart.shippingAddress.phone}
                                </p>
                            

                        </ListGroup.Item>

                    </ListGroup>

                    <ListGroup>
                        <ListGroup.Item >
                            <p className="subtitle"  >Payment Method</p>
                            <p className="ordinary_p" >
                                <strong>Method:   </strong>
                                {payment} 
                            </p>

                        </ListGroup.Item>

                    </ListGroup>

                </Col>
                

                <Col md={5}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                            <Col className="summary" >Order Summary</Col>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                    <Row>
                                        <Col className="ordinary_p" >Total</Col>
                                        <Col className="ordinary_p" >Ksh {cart.ItemsPrice}</Col>
                                    </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                    <Row>
                                        <Col className="ordinary_p" >Delivery fee</Col>
                                        <Col className="ordinary_p" >Ksh {cart.shippingFee}</Col>
                                    </Row>

                            </ListGroup.Item>
                            <div>
                                    {error && <Message variant='danger' >{error}</Message>}

                            </div>
                            <ListGroup.Item>
                                     <Row>
                                        <Col className="ordinary_p">Total</Col>
                                        <Col className="ordinary_p">Ksh  {cart.ItemsPrice+ cart.shippingFee} </Col>
                                    </Row>

                            </ListGroup.Item>
                            <ListGroup.Item>
                                    <Row>
                                        <Button
                                            type = 'button'
                                            className = 'btn-block order_button'
                                            disabled = {cart.cartItems === 0 }
                                            onClick= {placeOrder}
                                            variant='danger'
                                        >
                                        
                                        Place Order</Button>
                                    </Row>
                                   

                            </ListGroup.Item>
                        </ListGroup>
                        {cartItems.length === 0 && (
                            <Message variant='danger' > No items in cart</Message>
                               
                            
                            
                        )}
                    </Card>

                </Col>
            </Row>
            
            
        </div>
    )
}

export default PlaceOrderScreen
