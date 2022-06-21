import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import '../css/TextForm.css'


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
        if (password !==  confirmPassword ){
            setMessage("passwords do not match")
            
        } else if(password == '' ) {
            setMessage("please enter a password")

        }else{
            dispatch(register(email, name, user_name, phone_number, password))
        }
    
    }



    return (
        <FormContainer>
            <p className="subtitle" >Sign Up</p>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            <Form onSubmit={ submitHandler }>
                <Form.Group controlId='name'>
                    <Form.Label className="ordinary_p" >Name </Form.Label>
                        <Form.Control  className="ordinary_p" required type='text' placeholder='Enter your name' value={name}  onChange={(e) => setName(e.target.value) } >

                        </Form.Control>
                </Form.Group >

                <Form.Group controlId='user_name'>
                    <Form.Label className="ordinary_p" >Username</Form.Label>
                    <Form.Control className="ordinary_p" required type='text' placeholder='Enter a unique username' value={user_name}  onChange={(e) => setUsername(e.target.value) } >

                    </Form.Control>
                </Form.Group >


                <Form.Group controlId='email'>
                    <Form.Label className="ordinary_p" >Email Addresss</Form.Label>
                    <Form.Control className="ordinary_p" required type='email' placeholder='Enter email' value={email}  onChange={(e) => setEmail(e.target.value) } >

                    </Form.Control>
                </Form.Group >

                <Form.Group controlId='phone_number'>
                    <Form.Label className="ordinary_p" >Phone Number</Form.Label>
                    <Form.Control  className="ordinary_p" required type='phone' placeholder='Enter phone number' value={phone_number}  onChange={(e) => setPhone(e.target.value) } >

                    </Form.Control>

                </Form.Group >

                <Form.Group controlId='password'>
                    <Form.Label className="ordinary_p" >Password</Form.Label>
                    <Form.Control className="ordinary_p" required type='password' placeholder='Enter password' value={password}  onChange={(e) => setPassword(e.target.value) } >
                    </Form.Control>
                </Form.Group >

                <Form.Group controlId='confirmpassword'>
                    <Form.Label className="ordinary_p" >Password</Form.Label>
                    <Form.Control className="ordinary_p" required type='password' placeholder='Confirm password' value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value) } >
                    </Form.Control>
                </Form.Group >

                <Button  type='submit' className="login__button" variant='danger'>Sign In</Button>

            </Form>

            <Row className = 'py-3'>
                <Col className="ordinary_p" >
                    Have an account ? <Link to={'/register'} >Login</Link>
                
                </Col>

            </Row>
            
        </FormContainer>
    )
}

export default RegisterScreen
