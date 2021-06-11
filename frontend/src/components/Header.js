import React from 'react'
import { Container,Navbar, Nav,NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

function Header() {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () =>{
        dispatch(logout())
    }
   

    return (      
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to={'/'}> 
                        <Navbar.Brand>Nebula</Navbar.Brand>
                        </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                   
                        <Nav className="ml-auto">

                        <LinkContainer to={'/cart'}> 
                            <Nav.Link ><i className="fa fa-shopping-cart"></i>Cart</Nav.Link>
                        </LinkContainer>

                      
                        {userInfo ? (
                            <NavDropdown title={userInfo.name}  id='username'>
                            <LinkContainer to={'/profile'}> 
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>

                            <LinkContainer to={'/logout'}> 
                                <NavDropdown.Item onClick={logoutHandler} >Logout</NavDropdown.Item>
                            </LinkContainer>

                            </NavDropdown>
                        ) : (
                            <LinkContainer to={'/login'}> 
                                <Nav.Link><i className="fa fa-user"></i>Login</Nav.Link>
                            </LinkContainer>
                        
                    
                        )}
                                
                 
                            <NavDropdown title='Admin' id='adminmenue'>
                                
                            <NavDropdown.Item>Users</NavDropdown.Item>
                        

                            <NavDropdown.Item>Products</NavDropdown.Item>
                    

                            <NavDropdown.Item>Orders</NavDropdown.Item>
                    

                        </NavDropdown>
                        
                        
                        
                            
                        


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>           
    )
}

export default Header

