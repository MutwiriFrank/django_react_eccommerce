import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import '../css/CheckoutSteps.css'

function CheckoutSteps(step1, step2, step3, step4) {


    return (
        <ul className='checkout_stepsDiv'>
            <li>
                {step1?(
                        <LinkContainer to = '/login'>
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                    ):(
                        <Nav.Link disabled>Login</Nav.Link>
                    )
                }
            </li>
            <li>
                {step2?(
                        <LinkContainer to='/delivery'>
                            <Nav.Link>Delivery</Nav.Link>
                        </LinkContainer>
                    ):(
                        <Nav.Link disabled>Delivery</Nav.Link>
                    )
                }
            </li>
            <li>
                {step3?(
                        <LinkContainer to='/payment'>
                            <Nav.Link>Payment</Nav.Link>
                        </LinkContainer>
                    ):(
                        <Nav.Link disabled>Payment</Nav.Link>
                    )
                }
            </li>
            <li>
                {step4?(
                        <LinkContainer to='/place order'>
                            <Nav.Link>Place Order</Nav.Link>
                        </LinkContainer>
                    ):(
                        <Nav.Link disabled>Place Order</Nav.Link>
                    )
                }
            </li>
            
        </ul>
    )
}

export default CheckoutSteps
