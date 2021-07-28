import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer  } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'



function ProfileScreen({history}) {
    const [name, setName] = useState('')
    const [user_name, setUsername] = useState('')
    const [phone_number, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const myOrders = useSelector(state => state.myOrders )
    const {loading:loadingOrders, error:errorOrders, orders } = myOrders


    useEffect(() => {
        if (!userInfo){
            console.log("not")
            history.push('/login')
        }else{
            if(!user || !user.name || success){
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile')) 
                dispatch(listMyOrders()) 
            }else{
                setName(user.name)
                setUsername(user.user_name) 
                setEmail(user.email)
                setPhone(user.phone_number)
            }
        }
        
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) =>{
        e.preventDefault()

        if (phone_number.charAt(0) !== 0){
            setMessage("Your phone number must start with a zero")
        }

        if (password.length < 8){
            setMessage("password is too short")}

        if (password != confirmPassword){
            setMessage("password do not match")

        
        
        } else {

            if (password.length < 8){
                setMessage("Details submitted")}
            dispatch(updateUserProfile({
                
                'pk' : user.pk,
                'name' : name,
                'user_name' : user_name,
                'email' : email,
                'phone_number' : phone_number,
                'password' : password,
            }
            ))            
        }
        
    }

    return (
        <Row>
            <Col md={3}> 
                <h2>User Profile</h2>
                {error && <Message variant='danger'>{error}</Message>}
                {message && <Message variant='danger'>{message}</Message>}
            <Form onSubmit={ submitHandler }>
                <Form.Group controlId='name'>
                    <Form.Label>Name </Form.Label>
                        <Form.Control type='text' value={name}  onChange={(e) => setName(e.target.value) } >

                        </Form.Control>
                </Form.Group >

                <Form.Group controlId='user_name'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' placeholder='Enter a unique username' value={user_name}  onChange={(e) => setUsername(e.target.value) } >

                    </Form.Control>
                </Form.Group >


                <Form.Group controlId='email'>
                    <Form.Label>Email Addresss</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email}  onChange={(e) => setEmail(e.target.value) } >

                    </Form.Control>
                </Form.Group >

                <Form.Group controlId='phone_number'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type='phone' placeholder='Enter phone number' value={phone_number}  onChange={(e) => setPhone(e.target.value) } >

                    </Form.Control>

                </Form.Group >

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password}  onChange={(e) => setPassword(e.target.value) } >
                    </Form.Control>
                </Form.Group >

                <Form.Group controlId='confirmpassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm password' value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value) } >
                    </Form.Control>
                </Form.Group >

                <Button type='submit' style={{marginTop : "10px"}} variant='primary'>Submit</Button>

            </Form>

        

            
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant="danger" >{{error}}</Message>
                ) : (
                    <Table responsive className='table-sm' bordered hover size="sm">
                            <thead>
                                <tr>
                                <th></th>
                                <th>CODE</th>
                                <th>DATE</th>
                                <th >TOTAL</th>
                                <th>PAID</th>
                                <th> DELIVERED</th>
                                <th>VIEW ORDER</th>
                                <th>CANCEL</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                
                                {orders.map((order, index) => (
                                    <tr key={index}>                         
                                        <td>{index+1}</td>
                                        <td>
                                            <Link to={`/order/${order.id}`}>
                                                <p style={{  color:"blue", textDecoration: "underline"}}>{order.id}</p> 
                                            </Link>
                                        </td>
                                        <td>{(order.created_at).toString().split("T")[0]}</td>
                                        <td>Ksh{(order.total_price).toString().split(".")[0]}</td>
                                        <td>{order.isPaid ? 
                                            (<i class="fa fa-check" style={{color:"green"}}></i>) 
                                            : (<i class="fa fa-times" style={{color:"red"}}  ></i>)
                                        
                                        }</td>
                                        <td>{order.isDelivered ? 
                                            (<i class="fa fa-check" style={{color:"green"}} ></i>)
                                            : ( <i class="fa fa-times" style={{color:"red"}} ></i>)
                                        
                                        }</td>  
                                        <td> 
                                            <Link to={`/order/${order.id}`}>
                                                <i class="fa fa-eye" aria-hidden="true"></i>
                                            </Link>
                                        </td>
                                        <td>
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

export default ProfileScreen
