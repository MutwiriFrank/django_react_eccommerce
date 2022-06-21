import React, { useState, useEffect } from 'react'
import { ListGroup,Table, Button, Row, Col, Image, Card, ListGroupItem} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'
import '../css/Order.css'

function OrderScreen({ match, history  }) {
    const orderId = match.params.id
    const dispatch = useDispatch()


    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay
 
    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    useEffect(() => {
        if (!userInfo){
            history.push('/login')
        }
    },[userInfo, history])


    try{
        if (!loading && !error) {
            order.ItemsPrice = order.order_items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
        }

    }catch{
        const error2 = "Order does not exist"
    }
        

    


    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AdbuNTQ9aF9RpssvbzWFy_d0w-aon4P67Nss40XTpTKtp-j2_JBEIHEKMYLzekSdZqJeczweMT65zyLc'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }


    useEffect(() => {
        if (!order || successPay || order.id !== Number(orderId) || successDeliver ) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })


            dispatch(getOrderDetails(orderId))
        } 
        
        // else if (!order.isPaid) {
        //     if (!window.paypal) {
        //         addPayPalScript()
        //     } else {
        //         setSdkReady(true)
        //     } 
        // }
    }, [dispatch, order, orderId, successPay, successDeliver  ])


    

    const deliverHandler = () =>(
        dispatch(deliverOrder(order))
    )


    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : order == 'does not exist' ? (
        <Message variant='danger'>Order does not exist </Message>
    ): (
        <div className ="mainOrder_div">

            <Row>
                <Col md={7} >
                    <ListGroup variant='flush'>
                        <ListGroup.Item >
                            <p className="subtitle" >Delivery</p>
                            <p className="ordinary_p"><strong>Name: </strong>{order.user.name}</p>
                            <p className="ordinary_p"><strong>Email: </strong>{order.user.email}</p>
                            <p className="ordinary_p"><strong>Phone Number: </strong>{order.shippingAddress.phone}</p>
                            <p className="ordinary_p">
                                <strong>Address:   </strong>
                                {order.shippingAddress.city }, {order.shippingAddress.estate}, {order.shippingAddress.road}, {order.shippingAddress.landmark} 

                            </p>
                            {order.isDelivered ? (
                                <Message variant='success' >Delivered on {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning' >Not Delivered</Message>
                            )                             
                            }

                        </ListGroup.Item>

                    </ListGroup>

                    <ListGroup variant='flush'>
                        <ListGroup.Item >
                            <p className="subtitle">Payment Method</p>
                            <p className="ordinary_p">
                                <strong>Method:   </strong>
                                {order.payment_method} 
                            </p>
                            {order.isPaid ? (
                                <Message variant='success' >Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning' >Not paid</Message>
                            )                             
                            }
                        </ListGroup.Item>
                    </ListGroup>
                    
                    <ListGroup>               
                    <Table  responsive className='table-sm order__table' bordered hover size="sm">
                            <thead>
                                <tr>
                                <th></th>
                                <th className="table_subtitle"> Name</th>
                                <th className="table_subtitle">Quantity</th>
                                <th className="table_subtitle"> Price</th>
                                <th className="table_subtitle"> Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {order.order_items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="ordinary_p">{index+1}</td>                                 
                                        <td className="ordinary_p">{item.name}</td>
                                        <td className="ordinary_p" >{item.quantity}</td>
                                        <td className="ordinary_p">{item.price}</td>  
                                        <td className="ordinary_p">{item.price * item.quantity}</td>
                                    </tr>                            
                                    
                                ))}
                                <tr >
                                    <td className="ordinary_p" colSpan="4"><strong>Total</strong>  </td>
                                    <td>{ order.ItemsPrice}</td>
                                </tr>
                            
                            </tbody>
                        </Table>
                    </ListGroup>              
                </Col>
            
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                        
                                    <p className="subtitle">Order Summary</p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                    <Row>
                                        <Col className="ordinary_p">Item Total</Col>
                                        <Col className="ordinary_p" >Ksh {order.ItemsPrice}</Col>
                                    </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                    <Row>
                                        <Col className="ordinary_p">Delivery fee</Col>
                                        <Col className="ordinary_p">Ksh {order.shipping_price}</Col>
                                    </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                    {error && <Message variant='danger' >{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                    <Row>
                                        <Col className="ordinary_p">Total</Col>
                                        <Col className="ordinary_p">Ksh  {Number(order.ItemsPrice)+ Number(order.shipping_price)} </Col>
                                    </Row>
                            </ListGroup.Item>
                  
                        
                        </ListGroup>
                        
                        { userInfo && userInfo.isAdmin && !order.isDelivered && order.isPaid && (

                            <ListGroup.Item>
                                <Button
                                type="button"
                                variant="success"
                                className ="btn btn-block"
                                onClick={ deliverHandler}                              
                                >
                                    Mark as Delivered
                                </Button>

                            </ListGroup.Item>
                        )}
                    
                        
                    
                    </Card>

                </Col>
            </Row>
        
    </div>
)
}

export default OrderScreen
