import React, { useState, useEffect } from 'react'
import { ListGroup,Table, Button, Row, Col, Image, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions'


// function OrderScreen({ match  }) {
//     const orderId = match.params.id
//     const dispatch = useDispatch()

//     const [sdkReady, setSdkReady] = useState(false)

//     const orderDetails = useSelector(state => state.orderDetails)
//     const { order, error, loading } = orderDetails

//     const orderPay = useSelector(state => state.orderPay)
//     const { loading: loadingPay, success: successPay } = orderPay

//     try{
//         if(order){
//             console.log(order)
//             order.ItemsPrice =  order.order_items.reduce((acc, item ) => acc + item.quantity * item.price, 0 ).toFixed(2)
//         }

//     }catch{
//        const error2 = "Order does not exist"
//     }

//     const addPayPalScript = () =>{
//         const script = document.createElement('script')
//         script.type = 'text/javascript'
//         script.src = "https://www.paypal.com/sdk/js?client-id=AdbuNTQ9aF9RpssvbzWFy_d0w-aon4P67Nss40XTpTKtp-j2_JBEIHEKMYLzekSdZqJeczweMT65zyLc"
//         script.async = true
//         script.onload = () => {
//             setSdkReady(true)
//         }
//         document.body.appendChild(script)
//     }


//     useEffect (() =>{
//         if(!order || successPay || order.id !== Number(orderId)){
//             console.log("nimefika hapa")
//             dispatch(getOrderDetails(orderId))
//         }else if(!order.isPaid){
//             if(!window.paypal){
//                 addPayPalScript()
//             }else{
//                 setSdkReady(true)
//             }
//         }
       
//     },[dispatch,order, orderId, successPay  ])
    

//     const successPaymentHandler = (paymentResult) => {
//         console.log("nimefika hapa")
//         dispatch(payOrder(orderId, paymentResult))
//     }
   

//     console.log(error)
function OrderScreen({ match  }) {
    const orderId = match.params.id
    const dispatch = useDispatch()


    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    // const orderDeliver = useSelector(state => state.orderDeliver)
    // const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    // const userLogin = useSelector(state => state.userLogin)
    // const { userInfo } = userLogin


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
        if (!order || successPay || order.id !== Number(orderId) ) {
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            } 
        }
    }, [dispatch, order, orderId, successPay ])


    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }




    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : order == 'does not exist' ? (
        <Message variant='danger'>Order does not exist </Message>
    ): (
        <div>

            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item >
                            <h2>Delivery</h2>
                            <p><strong>Name: </strong>{order.user.name}</p>
                            <p><strong>Email: </strong>{order.user.email}</p>
                            <p><strong>Phone Number: </strong>{order.shippingAddress.phone}</p>
                            <p>
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

                    <ListGroup>
                        <ListGroup.Item >
                            <h2>Payment Method</h2>
                            {console.log(order)}
                            <p>
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
                                
                                {order.order_items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>                                      
                                        <Image src={item.image.url} alt={item.name} fluid  />
                                        </td>
                                        <td>{item.name}</td>
                                        <td >{item.quantity}</td>
                                        <td>{item.price}</td>  
                                        <td>{item.price * item.quantity}</td>
                                    </tr>                            
                                    
                                ))}
                                <tr >
                                    <td colSpan="5"><strong>Total</strong>  </td>
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
                        
                                    <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                    <Row>
                                        <Col>Item Total</Col>
                                        <Col>Ksh {order.ItemsPrice}</Col>
                                    </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                    <Row>
                                        <Col>Delivery fee</Col>
                                        <Col>Ksh {order.shipping_price}</Col>
                                    </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                    {error && <Message vvariant='danger' >{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>Ksh  {Number(order.ItemsPrice)+ Number(order.shipping_price)} </Col>
                                    </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader />}
                                        {!sdkReady ? (
                                            <Loader />
                                        ) : (
                                                <PayPalButton
                                                    amount={order.totalPrice}
                                                    onSuccess={successPaymentHandler}
                                                />
                                            )}
                                    </ListGroup.Item>
                                )}
                        
                        </ListGroup>
                    
                    </Card>

                </Col>
            </Row>
        
    </div>
)
}

export default OrderScreen
