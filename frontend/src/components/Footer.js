import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Col, Row } from 'react-bootstrap'
import '../css/Footer.css'

function Footer() {
    return (      
        <footer >
            <Container>
                <Row  >
                    <Col  className="list__column">
                        
                        <li className="ordinary_p">About us</li>
                        <li className="ordinary_p">Stories</li>
                        <li className="ordinary_p">Testimonials</li>
                        <li className="ordinary_p">Clients</li>
                        
                    
                    </Col>
                    <Col className="list__column">
                        
                        <li className="ordinary_p">About us</li>
                        <li className="ordinary_p">Stories</li>
                        <li className="ordinary_p">Testimonials</li>
                        <li className="ordinary_p">Clients</li>
                        
                    
                    </Col>
                    <Col    className="list__column">
                        
                        <li className="ordinary_p">About us</li>
                        <li className="ordinary_p">Stories</li>
                        <li className="ordinary_p">Testimonials</li>
                        <li className="ordinary_p">Clients</li>
                        
                    
                    </Col>
                    <Col className="list__column" >
                        
                        <li className="ordinary_p">Facebook</li>
                        <li className="ordinary_p">Twitter</li>
                        <li className="ordinary_p">Linked In</li>
                        <li className="ordinary_p">Instagram</li>
                        <li className="ordinary_p">Youtube</li>
                    </Col>                
                </Row>
                <Row>
                    <Col className="text-center copyright ordinary_p"> Copyright &copy; Nebula 2019</Col> 
                </Row>
            </Container>
        </footer>             
    )
}

export default Footer
