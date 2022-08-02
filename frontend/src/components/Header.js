import React, { useEffect }  from 'react' 
import { Dropdown} from 'react-bootstrap'
import {  Cart } from 'react-bootstrap-icons'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Search from './Search'
import Sidebar from './Sidebar'
import { listCategories, listRoomCategories } from '../actions/categoryAction'

import { logout } from '../actions/userActions'
import '../css/Header.css'


function Header() {

    const cart = useSelector(state=>state.cart )
    const { cartItems} = cart


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () =>{
        dispatch(logout())
    }

    useEffect(() => {
        
    } )
    


    return (
        <>
        
        <div className='header'>
            <LinkContainer to={'/'}> 
            
                <img className="header__logo" src="images/nebula_homes2_logo.png"  alt="Nebula" ></img>
            </LinkContainer>

            <div className="mainNav_search">
            <Search />

            </div>
            <div className="header__nav" >

                {userInfo &&
                    <div className='header__option' >
                
                    <LinkContainer to={'/profile'}>                                                                                                                                                                     
                        <span className='header__optionLineTwo' >Profile</span>
                        </LinkContainer>
                    </div>
                }

                {userInfo &&
                    <div className='header__option' >
                        
                        <LinkContainer to={'/orders'}> 
                            <span className='header__optionLineTwo' >Orders</span>
                        </LinkContainer>
                    </div>
                }
                <div className='header__option ' >
                    <span className='header__optionLineTwo' >{ userInfo ?
                        <LinkContainer to={'/login'}> 
                        <span onClick={logoutHandler} >Logout</span></LinkContainer> 
                        : <LinkContainer to={'/login'}> 
                        <span>Login</span>
                        </LinkContainer> }
                    </span>
                </div>
                
                
                <div className='header__optionBasket' >
                    <LinkContainer to={'/cart'}> 
                        <Cart />
                    </LinkContainer>
                    <span className='header__optionLineTwo header_basketCount ' >{cartItems?.length}</span>
                </div>
                
                {userInfo && userInfo.isAdmin && (
                    <div className='header__optionBasket' >
                    <Dropdown className="nav_admin_dropdown" >
                            <Dropdown.Toggle  id="dropdown-basic">
                            Admin
                        </Dropdown.Toggle>
                    
                        <Dropdown.Menu>
                        <LinkContainer to={'/admin/userlist'}> 
                        <Dropdown.Item >Users</Dropdown.Item>
                        </LinkContainer>


                        <LinkContainer to={'/admin/products'}> 
                        <Dropdown.Item >Products</Dropdown.Item>
                        </LinkContainer>

                        <LinkContainer to={'/admin/orders'}> 
                        <Dropdown.Item >Orders</Dropdown.Item>
                        </LinkContainer>


                        </Dropdown.Menu>
                    </Dropdown>
                    </div>

                    )}

            </div>

        </div>

            <Sidebar />
        </>
        
    )
}

export default Header

