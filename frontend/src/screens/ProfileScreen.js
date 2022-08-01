import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {  ListGroup , Col, Row, } from 'react-bootstrap'
import { LinkContainer  } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import EditProfile from '../components/EditProfile'
import ProfileShipping from '../components/ProfileShipping'
import CancelledOrders from '../components/CancelledOrders'

import MyOrderScreen from '../screens/MyOrderScreen'


import '../css/Profile.css'



function ProfileScreen({history}) {
    const [showUserDetails, setshowUserDetails] = useState(true)
    const [showOrders, setShowOrders] = useState(false)
    const [showProfileShipping, setShowProfileShipping] = useState(false)
    // const [showCancelledOrders, setShowCancelledOrders] = useState(true)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        if (!userInfo){
            history.push('/login')
        }
    }, [ history, userInfo])

    const handleProfile = event => {
        setshowUserDetails(true);
        setShowOrders(false);
        setShowProfileShipping(false)
        // setShowCancelledOrders(false)

    }

    const handleOrders = event => {
        setShowOrders(true);
        setshowUserDetails(false)
        setShowProfileShipping(false)
        // setShowCancelledOrders(false)
    }

    const handleShipping = event => {
        setShowProfileShipping(true)
        setShowOrders(false);
        setshowUserDetails(false)
        // setShowCancelledOrders(false)
    }

    // const handleCancelledOrders = event => {
    //     setShowCancelledOrders(true)
    //     setShowProfileShipping(false)
    //     setShowOrders(false);
    //     setshowUserDetails(false)
    // }

   

    return (
        <Row>
            
            <Col sm={0} md={0} lg={1}> </Col>

            <Col sm={0} md={0} lg={3} className="profile_sidebar_div" > 
            <ListGroup className='profile_sidebar' >
                <ListGroup.Item variant='flush'  className="profile_sidebar_list_group_item">
                    <div className="profile_listgroup" >
                
                    <Link onClick={handleProfile} to='#'>
                        <span className="profile_sidebar_links" >Edit Profile </span>
                    </Link>
                    
                    </div>
                </ListGroup.Item>
        
                <ListGroup.Item className="profile_sidebar_list_group_item" > 
                    <div className="profile_listgroup"  >
                        <Link onClick={handleOrders}  to='#'>
                            <span className="profile_sidebar_links" > Orders</span>
                        </Link>
                        
                    </div>     
                </ListGroup.Item>
        
             {/*      <ListGroup.Item className="profile_sidebar_list_group_item" >    
                    <div className="profile_listgroup" >
                    
                        <Link to='/'>
                            <span className="profile_sidebar_links" >Pending Orders</span>
                        </Link>
                    </div>
        
                </ListGroup.Item>
            
                <ListGroup.Item className="profile_sidebar_list_group_item">                
                    <div className="profile_listgroup">
                        <Link to='/'>
                            <span className="profile_sidebar_links" >Delivered Orders</span>
                        </Link>
                    </div>    
                </ListGroup.Item>

       
        
                <ListGroup.Item className="profile_sidebar_list_group_item">                
                    <div className="profile_listgroup">
                        <Link onClick= {handleCancelledOrders} to='#'>
                            <span className="profile_sidebar_links" >Cancelled Orders</span>
                        </Link>
                    </div>    
                </ListGroup.Item>

                     */}
        
                <ListGroup.Item className="profile_sidebar_list_group_item">                
                    <div className="profile_listgroup">
                        <Link onClick = {handleShipping} to='#'>
                            <span className="profile_sidebar_links" >Shipping Details</span>
                        </Link>
                    
                    </div>    
                </ListGroup.Item>

                <ListGroup.Item className="profile_sidebar_list_group_item">                
                <div className="profile_listgroup">
                    <Link to='#'>
                        <span className="profile_sidebar_links" >Inbox</span>
                    </Link>
                </div>    
            </ListGroup.Item>

            </ListGroup>
    
        
            </Col>
            
            <Col sm={12} md={6} lg={8} className="profile__div"> 
                {showUserDetails && (
                    <EditProfile />
                )}

                {showOrders && (
                    <MyOrderScreen />
                )}

                {showProfileShipping && (
                    <ProfileShipping  />
                )}

{/*
                {showCancelledOrders && (
                    <CancelledOrders  />
                )}

            */}
                    
            </Col>

        
            <Col sm={0} md={0} lg={1}> </Col>


            
            
        </Row>
    )
}

export default ProfileScreen
