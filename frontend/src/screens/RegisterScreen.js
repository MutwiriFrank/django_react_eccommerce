import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../actions/userActions'

import '../css/Registration.css'


function RegisterScreen({location, history}) {
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

   

    const submitHandler = (e) =>{
        e.preventDefault()
      

        if (password !==  confirmPassword ){
            setMessage("passwords do not match")

        } else if(phone_number.length !== 10  ) {
            setMessage("Phone numner not valid")


        } else if(password == '' ) {
            setMessage("please enter a password")

        } else if(password.length < 8 ) {
            setMessage("please enter atleast 8 characters  password")

        }else{
            dispatch(register(email,  user_name, phone_number, password))
        }
    }

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    return (

        <div className="registration_div">

        <Col className="registration_form_col" sm={10} md={6} lg={4} >
            <p className="form_title" >Create Account</p>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            <Form className="registrationi" onSubmit={ submitHandler }>        

                <Form.Group className="form_group" controlId='user_name'>
                    <Form.Label className="form_label" > Name</Form.Label>
                    <Form.Control className="registration_input" required type='text' placeholder='Your Name' value={user_name}  onChange={(e) => setUsername(e.target.value) } >

                    </Form.Control>
                </Form.Group >


                <Form.Group controlId='email' className="form_group" >
                    <Form.Label className="form_label" >Email Addresss</Form.Label>
                    <Form.Control className="registration_input" required type='email' placeholder='Your Email' value={email}  onChange={(e) => setEmail(e.target.value) } >

                    </Form.Control>
                </Form.Group >

                <Form.Group className="form_group"  controlId='phone_number'>
                    <Form.Label className="form_label" >Phone Number</Form.Label>
                    <Form.Control  className="ordinary_p" required type='phone' placeholder='Your Phone Number' value={phone_number}  onChange={(e) => setPhone(e.target.value) } >

                    </Form.Control>

                </Form.Group >

                <Form.Group className="form_group"  controlId='password'>
                    <Form.Label className="form_label" >Password</Form.Label>
                    <Form.Control className="ordinary_p" required type='password' placeholder='Enter atleast 8 characters' value={password}  onChange={(e) => setPassword(e.target.value) } >
                    </Form.Control>
                </Form.Group >

                <Form.Group className="form_group"  controlId='confirmpassword'>
                    <Form.Label className="form_label" >Password</Form.Label>
                    <Form.Control className="ordinary_p" required type='password' placeholder='Confirm password' value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value) } >
                    </Form.Control>
                </Form.Group >

                <Button  type='submit' className="registration_button" variant='danger'>Sign In</Button>

            </Form>

            <Row className = 'py-3'>
                <Col className="form_label" >
                    Already have an account ? <Link className="form_links" to={'/login'} >Login</Link>
                
                </Col>

            </Row>
            
        </Col>
        </div>
    )
}

export default RegisterScreen
