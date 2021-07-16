import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function CheckoutSteps(step1, step2, step3, step4) {


    return (
        <Nav className='justify-content-center my-4'>
            <Nav.Item>
                {step1?(
                        <LinkContainer to = '/login'>
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                    ):(
                        <Nav.Link disabled>Login</Nav.Link>
                    )
                }
            </Nav.Item>
            <Nav.Item>
                {step2?(
                        <LinkContainer to='/delivery'>
                            <Nav.Link>Delivery</Nav.Link>
                        </LinkContainer>
                    ):(
                        <Nav.Link disabled>Delivery</Nav.Link>
                    )
                }
            </Nav.Item>
            <Nav.Item>
                {step3?(
                        <LinkContainer to='/payment'>
                            <Nav.Link>Delivery</Nav.Link>
                        </LinkContainer>
                    ):(
                        <Nav.Link disabled>Delivery</Nav.Link>
                    )
                }
            </Nav.Item>
            <Nav.Item>
                {step4?(
                        <LinkContainer to='/place order'>
                            <Nav.Link>Place Order</Nav.Link>
                        </LinkContainer>
                    ):(
                        <Nav.Link disabled>Place Order</Nav.Link>
                    )
                }
            </Nav.Item>
            
        </Nav>
    )
}

export default CheckoutSteps
