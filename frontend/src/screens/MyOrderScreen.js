import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Button, Col, Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listMyOrders } from '../actions/orderActions'
import '../css/Profile.css'

function MyOrderScreen({history}) {

    const dispatch = useDispatch()

    

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const myOrders = useSelector(state => state.myOrders )
    const {loading:loadingOrders, error:errorOrders, orders } = myOrders

    useEffect(() => {
        if (!userInfo){
            history.push('/login')
        }else{
            
            dispatch(listMyOrders()) 
            
        }
        
    }, [dispatch, history, userInfo, ])

    return (
        <Row>
        <Col md={12} lg={9} >
                <p className="subtitle">My Orders</p>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant="danger" >{errorOrders}</Message>
                ) : (
                    <Table responsive className='table-sm order_table' bordered hover size="sm">
                            <thead>
                                <tr>
                                <th></th>
                         
                                <th className="table_subtitle" >CODE</th>
                                <th className="table_subtitle" >DATE</th>
                                <th className="table_subtitle">TOTAL</th>
                                <th className="table_subtitle" >PAID</th>
                                <th className="table_subtitle" > DELIVERED</th>
                                <th className="table_subtitle" >VIEW ORDER</th>
                                <th className="table_subtitle" >CANCEL</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                
                                {orders.map((order, index) => (
                                    <tr key={index}>                         
                                        <td className="ordinary_p" >{index+1}</td>
                                        <td className="ordinary_p" >
                                            <Link to={`/order/${order.id}`}>
                                                <p style={{  color:"tomato", textDecoration: "underline"}}>{order.id}</p> 
                                            </Link>
                                        </td>
                                        <td className="ordinary_p" >{(order.created_at).toString().split("T")[0]}</td>
                                        <td className="ordinary_p" >Ksh{(order.total_price).toString().split(".")[0]}</td>
                                        <td className="ordinary_p" >{order.isPaid ? 
                                            (<i className="fa fa-check" style={{color:"green"}}></i>) 
                                            : (<i className="fa fa-times" style={{color:"red"}}  ></i>)
                                        
                                        }</td>
                                        <td className="ordinary_p" >{order.isDelivered ? 
                                            (<i className="fa fa-check" style={{color:"green"}} ></i>)
                                            : ( <i className="fa fa-times" style={{color:"red"}} ></i>)
                                        
                                        }</td>  
                                        <td className="ordinary_p" > 
                                            <Link to={`/order/${order.id}`}>
                                                <i className="fa fa-eye" aria-hidden="true"></i>
                                            </Link>
                                        </td>
                                        <td className="ordinary_p" >
                                        <Button
                                                type= 'button'
                                                variant= 'light'
                                        > 
                                            <i className='fa fa-trash' style={{color:"red", fontSize:"19px" }}></i>

                                            </Button>
                                        </td>
                                    </tr>                                
                                    
                                ))}

                            
                            </tbody>
                        </Table>
                )
                
                
                }
            </Col>
            
        </Row>
    )
}

export default MyOrderScreen
