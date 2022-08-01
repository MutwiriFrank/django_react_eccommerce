import React from 'react'
import { Link } from 'react-router-dom'

import {  ListGroup , Col,  } from 'react-bootstrap'
import '../css/Profile.css'


function ProfileSidebar() {

  return (
    <Col>

    <ListGroup  className="profile_sidebar">
        <ListGroup.Item variant='flush'  className="profile_sidebar_list_group_item">
            <div className="profile_listgroup" >


            <Link to='/'>
                <span className="profile_sidebar_links" >Profile Summary</span>
            </Link>
            
            </div>
        </ListGroup.Item>

        <ListGroup.Item className="profile_sidebar_list_group_item" > 
            <div className="profile_listgroup"  >
                <Link to='/'>
                    <span className="profile_sidebar_links" >All Orders</span>
                </Link>
                
            </div>     
        </ListGroup.Item>

        <ListGroup.Item className="profile_sidebar_list_group_item" >    
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
                <Link to='/'>
                    <span className="profile_sidebar_links" >Cancelled Orders</span>
                </Link>
             </div>    
        </ListGroup.Item>

        <ListGroup.Item className="profile_sidebar_list_group_item">                
            <div className="profile_listgroup">
                <Link to='/'>
                    <span className="profile_sidebar_links" >Shipping Details</span>
                </Link>
            
            </div>    
        </ListGroup.Item>
     
</ListGroup>

    
    
    </Col>
  )
}

export default ProfileSidebar