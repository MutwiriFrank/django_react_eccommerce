import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import '../css/Registration.css'


function LoginScreen({ location, history }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')


    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if  (!(email.match(validRegex))) {
            setMessage("Email not valid")


        // } else if (password.length < 8 ) {
        //     setMessage("please enter atleast 8 characters  password")

        }else{
            dispatch(login(email, password))
        }
        
    }

    return (
        <div className="registration_div">

            <Col className="registration_form_col" sm={10} md={6} lg={4} >
            <p className="form_title">Sign In</p>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group className="form_group"  controlId='email'>
                    <Form.Label className="form_label">Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="ordinary_p"
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group className="form_group"  controlId='password'>
                    <Form.Label className="form_label">Password</Form.Label>
                    <Form.Control
                        required
                        className="ordinary_p"
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='danger' className="registration_button">
                    Sign In
                </Button>
            </Form>

            <Row className='py-3'>
                <Col  className="form_label">
                    New Customer? <Link  className="form_links"
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                        </Link>
                </Col>
            </Row>

            </Col>
        </div>
    )
}

export default LoginScreen
