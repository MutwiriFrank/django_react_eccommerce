import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import '../css/Registration.css'



function ResetPasswordScreen({ location, history }) {
    const [otp, setOTP] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')


    const dispatch = useDispatch()

  
        
           
 
    const submitHandler = (e) => {
        e.preventDefault()

        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if  (!(email.match(validRegex))) {
            setMessage("Email not valid")


        // } else if (password.length < 8 ) {
        //     setMessage("please enter atleast 8 characters  password")

        }else{
            dispatch(login(email))
        }

        history.push('/reset-password')
        
    }

    return (
        <div className="registration_div">

            <Col className="registration_form_col" sm={10} md={6} lg={4} >
            <p className="form_title">Reset Password</p>
      
            {message && <Message variant='info'>{message}</Message>}
        
            <Form onSubmit={submitHandler}>

                <Form.Group className="form_group"  controlId='email'>
                    <Form.Label className="form_label">Email Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter  OTP'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="ordinary_p"
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="form_group"  controlId='email'>
                    <Form.Label className="form_label">Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Your Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="ordinary_p"
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' className="registration_button">
                    Submit
                </Button>
            </Form>

            <Row className='py-3'>
                <Col  className="form_label">
                    Received OTP? <Link  className="form_links"
                        to={'/reset-password'}>
                        Create new password
                        </Link>
                </Col>
            </Row>

            </Col>
        </div>
    )
}

export default ResetPasswordScreen
