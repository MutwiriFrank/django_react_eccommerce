import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import '../css/Delivery.css'


function ShippingScreen({history}) {

    const cart  = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [city, setCity] = useState(shippingAddress.city)
    const [estate, setEstate] = useState(shippingAddress.estate)
    const [road, setRoad] = useState(shippingAddress.road)
    const [landmark, setLandmark] = useState(shippingAddress.landmark)
    const [phone, setPhone] = useState(shippingAddress.phone)
    const [alternative_phone, setAlternative_phone] = useState(shippingAddress.alternative_phone)
    const [message, setMessage] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress( { city, estate, road, landmark, phone, alternative_phone } ) )
        history.push('/payment')
    }

    return (
      
        <FormContainer>
            <CheckoutSteps step1 step2  />
            <p className="subtitle" >Fill Details </p>
         
            {message && <Message variant='danger'>{message}</Message>}
            <Form onSubmit={ submitHandler }>
            <Form.Group controlId='city'>
                    <Form.Label className="form__deliveryDetails" >City </Form.Label>
                        <Form.Control  className="form__deliveryDetails" required type='text' value={city ? city : ''}  placeholder='Enter City'  onChange={(e) => 
                            setCity(e.target.value) } >

                        </Form.Control>
                </Form.Group >



                <Form.Group controlId='estate'>
                    <Form.Label   className="form__deliveryDetails" >Estate or Location</Form.Label>
                    <Form.Control  className="form__deliveryDetails" required type='text' placeholder='Enter estate' value={estate ?  estate : ''}  onChange={(e) => 
                        setEstate(e.target.value) } >

                    </Form.Control>
                </Form.Group >

                <Form.Group  className="form__deliveryDetails"controlId='road'>
                    <Form.Label  className="form__deliveryDetails" >Road</Form.Label>
                    <Form.Control  className="form__deliveryDetails"  required type='text' placeholder='Enter road' value={road ? road : ''}  onChange={(e) => 
                        setRoad(e.target.value) } >

                    </Form.Control>
                </Form.Group >

                <Form.Group controlId='landmark'>
                    <Form.Label  className="form__deliveryDetails" >Landmark</Form.Label>
                    <Form.Control  className="form__deliveryDetails" required type='text' placeholder='Enter landmark' value={landmark ? landmark : ''}  onChange={(e) => 
                        setLandmark(e.target.value) } >

                    </Form.Control>
                </Form.Group >

                <Form.Group controlId='phone'>
                    <Form.Label  className="form__deliveryDetails" >Phone Number</Form.Label>
                    <Form.Control  className="form__deliveryDetails" required type='phone' placeholder='Enter phone number' value={phone ? phone : ''}  onChange={(e) => 
                        setPhone(e.target.value) } >

                    </Form.Control>

                </Form.Group >

                <Form.Group controlId='phone'>
                    <Form.Label  className="form__deliveryDetails" >Alternative phone</Form.Label>
                    <Form.Control  className="form__deliveryDetails" required type='phone' placeholder='Enter alternative phone number' value={alternative_phone ? alternative_phone : ''}
                      onChange={(e) => setAlternative_phone(e.target.value) } >
                    </Form.Control>
                </Form.Group >

                <Button type='submit' className="continue_button" variant='danger '>Continue</Button>

            

                
            </Form>
            
        </FormContainer>
       
    )
}

export default ShippingScreen
