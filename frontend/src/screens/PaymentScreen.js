import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'


function PaymentScreen({history}) {

    const cart = useSelector(state=>state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [ paymentMethod, setPaymentMethod ] = useState('mpesa')

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
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Mpesa'
                            value='mpesa'
                            id='mpssesa'
                            name='paymentMethod'
                            checked
                            onChange = {(e) => setPaymentMethod(e.target.value) }
                        >
                        </Form.Check>
                    </Col>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Pay on Delivey'
                            value='ondelivery'
                            id='ondelivery'
                            name='paymentMethod'
                            
                            onChange = {(e) => setPaymentMethod(e.target.value) }
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary' >Continue</Button>
                
            </Form>
        </FormContainer>

    )}

export default PaymentScreen
