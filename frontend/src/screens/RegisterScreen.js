import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'


function RegisterScreen({location, history}) {
    const [name, setName] = useState('')
    const [user_name, setUsername] = useState('')
    const [phone_number, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)

    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        console.log("Clicked")
        if (password !==  confirmPassword ){
            setMessage("passwords do not match")

        }else{
            dispatch(register(email, name, user_name, phone_number, password))
        }
    
       
    }



    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            <Form onSubmit={ submitHandler }>
                <Form.Group controlId='name'>
                    <Form.Label>Name </Form.Label>
                        <Form.Control type='text' placeholder='Enter your name' value={name}  onChange={(e) => setName(e.target.value) } >

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

                <Button type='submit' style={{marginTop : "10px"}} variant='primary'>Sign In</Button>

            </Form>

            <Row className = 'py-3'>
                <Col>
                    Have an account ? <Link to={'/register'} >Login</Link>
                
                </Col>

            </Row>
            
        </FormContainer>
    )
}

export default RegisterScreen
