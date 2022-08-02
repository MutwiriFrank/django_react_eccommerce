import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { forgetPassword } from '../actions/userActions'
import '../css/Registration.css'

import { FORGET_PASSWORD_RESET } from '../constants/passwordConstants'



function ForgetPasswordScreen({ location, history }) {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const passwordForget = useSelector(state => state.passwordForget )
    const {error, loading, otpmessage } = passwordForget


    const dispatch = useDispatch()

   

 
    const submitHandler = (e) => {
        e.preventDefault()

        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if  (!(email.match(validRegex))) {
            setMessage("Email not valid")
        }else{
            dispatch(forgetPassword(email))
        }
        
    }

    useEffect(() => {
        if (error) {

            history.push('/forget-password')
        }else if (otpmessage){

            localStorage.setItem('email', JSON.stringify(otpmessage) )
            
            history.push('/reset-password')
            dispatch({type : FORGET_PASSWORD_RESET})
        }


    }, [history, error , otpmessage, dispatch])

    return (
        <div className="registration_div">

            <Col className="registration_form_col" sm={10} md={6} lg={4} >
            <p className="form_title">Reset Password</p>
      
            { error && <Message variant='danger'>{error}</Message>}
            { message && <Message variant='danger'>{error}</Message>}
        
        
            <Form onSubmit={submitHandler}>

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
                        Set password
                        </Link>
                </Col>
            </Row>

            </Col>
        </div>
    )
}

export default ForgetPasswordScreen
