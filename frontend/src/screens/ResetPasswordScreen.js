import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { resetPassword } from '../actions/userActions'
import '../css/Registration.css'
import { FORGET_PASSWORD_RESET } from '../constants/passwordConstants'



function ResetPasswordScreen({ location, history }) {
    const [otp, setOTP] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    const dispatch = useDispatch()

    const passwordReset = useSelector(state => state.passwordReset )
    const {error, loading, userInfo } = passwordReset

        

    let email_obj = JSON.parse(localStorage.getItem("email")); 
    let email = email_obj['email']

    useEffect(() => {
        dispatch({type : FORGET_PASSWORD_RESET})
        
        if (userInfo){
            console.log(userInfo)

            history.push('/')
        }
    }, [ dispatch, history, userInfo])
           
 
    const submitHandler = (e) => {
        e.preventDefault()


        if (password !== confirmPassword){
        setMessage("Password does not match")

        } else if (password.length < 8 ) {
           setMessage("please enter atleast 8 characters  password")

        }else{
           dispatch( resetPassword (email, otp, password) )
        }

        
        
    }


    return (
        <div className="registration_div">

            <Col className="registration_form_col" sm={10} md={6} lg={4} >
            <p className="form_title">Set  Password</p>
      
            {message && <Message variant='info'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
        
            <Form onSubmit={submitHandler}>

            <Form.Group className="form_group"  controlId='email'>
            <Form.Label className="form_label">Email</Form.Label>
            <Form.Control
                required
                type='text'
                placeholder='Enter  OTP'
                value={email}
               
            >
            </Form.Control>
        </Form.Group>

                <Form.Group className="form_group"  controlId='otp'>
                    <Form.Label className="form_label">OTP</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter  OTP'
                        value={otp}
                        onChange={(e) => setOTP(e.target.value)}
                        className="ordinary_p"
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="form_group"  controlId='password'>
                    <Form.Label className="form_label">New Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter New Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="ordinary_p"
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="form_group"  controlId='confirmPassword'>
                <Form.Label className="form_label">Confirm Password </Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Enter Your Email'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                   Not Received OTP? <Link  className="form_links"
                        to={'/forget-password'}>
                        Send New Otp
                        </Link>
                </Col>
            </Row>

            </Col>
        </div>
    )
}

export default ResetPasswordScreen
