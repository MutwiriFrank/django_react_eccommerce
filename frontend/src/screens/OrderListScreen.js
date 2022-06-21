import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Table, Button, } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { ordersList } from '../actions/orderActions'
import Message from '../components/Message'
import Loader from '../components/Loader'


function OrderListScreen ( { history } ) {
    const dispatch = useDispatch()

    const listOrders = useSelector(state => state.listAllOrders)
    const { orders, loading, error } = listOrders

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect( ()=>{
        if (userInfo && userInfo.isAdmin ){
            dispatch (ordersList())
        }else{
            history.push('/login')
        }
    

    }, [dispatch, history, userInfo] )

    const cancelHandler = () => {
        console.log("order cancelled")
    }
 


    return (
        <div>
            { error && <Message>{error}</Message> }

{loading  ? 
    <Loader /> 
 
    : error ?<Message  variant='danger'>{error}</Message>
    : !orders ? <Message>Kindly reload to view the orders</Message>
    :(
        <Table responsive className='table-sm' bordered hover size="sm" >
            <thead>
                <tr>
                    <th></th>
                    <th>ID</th>
                    <th>User</th>
                    <th>OrderItems</th>
                    <th>Payment Method</th>
                    <th>Created at</th>
                    <th>Shipping Price</th>
                    <th>Paid</th>
                    <th>Delivered</th>

                    <th>Total Price</th>
                    <th></th>
                </tr>
            
            </thead>
            <tbody>
                { orders.map((order, index) => (
                    <tr key={index}>
                        <td>{index + 1 }</td>
              
                        <td>{order.id} </td>
                        <td>{order.user.user_name}</td>
                        <td>{order.orderItems}</td>
                        <td>{order.payment_method}</td>

                        <td>{ (order.created_at).toString().split("T")[0] } </td>
                        <td>{order.shipping_price}</td>
                        <td>{order.is_paid ? (<i className="fa fa-check" style={{color: 'green'}} > </i> ) : ( <i className="fa fa-times" style={{color: 'red'}} ></i> )  }</td>
                        <td>{order.isDelivered ? (<i className="fa fa-check" style={{color: 'green'}} > </i> ) : ( <i className="fa fa-times" style={{color: 'red'}} ></i> ) }</td>
                        <td>{order.total_price }</td>
                        <td>
                            <LinkContainer to={`/order/${order.id}`} >
                                <Button variant='light' className='btn' size="sm" > 
                                    <i className="fa fa-edit" style={{color: 'black'}} >edit</i> 
                                </Button>                                      
                            </LinkContainer>
                            <Button variant='danger' size="sm" onClick={() => cancelHandler(order.id) }>
                                <i className="fa fa-trash"  ></i> 
                            </Button> 
                            

                        </td>
                    </tr>  
                ) )}                             
            </tbody>
        </Table>
    )
}   
            
        </div>
    )
}

export default OrderListScreen
