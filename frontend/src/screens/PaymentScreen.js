import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'
import '../css/PaymentScreen.css'


function PaymentScreen({history}) {

    const cart = useSelector(state=>state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [ paymentMethod, setPaymentMethod ] = useState()

    if(!shippingAddress.city){
        history.push('/delivery')
    }
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (

        <FormContainer>

            <CheckoutSteps step1 step2 step3 />


            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label className="subtitle" as='legend'>Select Method</Form.Label>
                    <Col> 
                    <Form.Check
                        required
                        type='radio'
                        label='Pay on Delivey'
                        value='ondelivery'
                        id='ondelivery'
                        name='paymentMethod'
                        className="form__deliveryDetails" 
                        onChange = {(e) => setPaymentMethod(e.target.value) }
                    >
                    </Form.Check>
                </Col>
                    
                    
                    <Col>
                        <Form.Check
                            disabled
                            type='radio'
                            label='Mpesa'
                            value='mpesa'
                            id='mpesa'
                            name='paymentMethod'
                            className="form__deliveryDetails" 
                            
                            onChange = {(e) => setPaymentMethod(e.target.value) }
                        >
                        </Form.Check>
                    </Col>
                
                    <Col>
                        <Form.Check
                        disabled
                            type='radio'
                            label='Card'
                            value='card'
                            id='card'
                            name='paymentMethod'
                            className="form__deliveryDetails" 
                            onChange = {(e) => setPaymentMethod(e.target.value) }
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button className="continue__button" type='submit' variant='danger' >Continue</Button>
                
            </Form>
        </FormContainer>

    )}

export default PaymentScreen
