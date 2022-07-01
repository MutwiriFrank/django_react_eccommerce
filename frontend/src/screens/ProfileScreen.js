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
import '../css/Profile.css'



function ProfileScreen({history}) {
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
            history.push('/login')
        }else{
            const userId = Number(userInfo.id)
            if(!user || !user.user_name || success || userId !== user.id ){
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails(userId.toString())) 
                dispatch(listMyOrders()) 
            }else if ( userId === user.id ){
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

        if (password !== confirmPassword){
            setMessage("password do not match")

        
        
        } else {

            if (password.length < 8){
                setMessage("Details submitted")}
            dispatch(updateUserProfile({
                
                'pk' : user.pk,
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
            <Col sm={12} md={7} lg={5} className="profile__div"> 

                <p className="subtitle">User Profile</p>

                {error && <Message variant='danger'></Message>}
                {message && <Message variant='danger'>{message}</Message>}
                <p className="ordinary_p" > <strong>Edit by changing the values</strong> </p>
            <Form onSubmit={ submitHandler }>
              

                <Form.Group controlId='user_name'>
                    <Form.Label className="ordinary_p" >Name</Form.Label>
                    <Form.Control className="ordinary_p" type='text' placeholder='Enter a unique username' value={user_name}  onChange={(e) => setUsername(e.target.value) } >

                    </Form.Control>
                </Form.Group >


                <Form.Group controlId='email'>
                    <Form.Label className="ordinary_p" >Email Addresss</Form.Label>
                    <Form.Control className="ordinary_p" type='email' placeholder='Enter email' value={email}  onChange={(e) => setEmail(e.target.value) } >

                    </Form.Control>
                </Form.Group >

                <Form.Group controlId='phone_number'>
                    <Form.Label className="ordinary_p" >Phone Number</Form.Label>
                    <Form.Control className="ordinary_p" type='phone' placeholder='Enter phone number' value={phone_number}  onChange={(e) => setPhone(e.target.value) } >

                    </Form.Control>

                </Form.Group >

                <Form.Group controlId='password'>
                    <Form.Label className="ordinary_p" >Password</Form.Label>
                    <Form.Control className="ordinary_p" type='password' placeholder='Enter password' value={password}  onChange={(e) => setPassword(e.target.value) } >
                    </Form.Control>
                </Form.Group >

                <Form.Group controlId='confirmpassword'>
                    <Form.Label className="ordinary_p" >Password</Form.Label>
                    <Form.Control className="ordinary_p" type='password' placeholder='Confirm password' value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value) } >
                    </Form.Control>
                </Form.Group >

                <Button type='submit' style={{marginTop : "10px"}} variant='primary'>Submit</Button>

            </Form>

        

            
            </Col>
            
            
        </Row>
    )
}

export default ProfileScreen
