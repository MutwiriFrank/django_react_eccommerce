import React, { useState, useEffect } from 'react'
import { LinkContainer} from 'react-router-bootstrap'
import { Table, Button,  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers, deleteUser } from '../actions/userActions'



function UserListScreen( {history} ) {

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
        
    const userDelete = useSelector(state => state.userDelete)
    const { success:success_delete, error:delete_error } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        }else{
            history.push('/')
        }
        
    }, [dispatch, history, userInfo, success_delete] )

    const deleteHandler = (id) =>{
        if(window.confirm("Are you sure you want to delete this user? ")){
            dispatch(deleteUser(id))
        }
        
    }
    return (
        
        <div>

            {loading  ? 
                <Loader /> 
                : error ?<Message  variant='danger'>{error}</Message>
                :(
                    <Table responsive className='table-sm' bordered hover size="sm" >
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Admin</th>
                                <th></th>
                            </tr>
                        
                        </thead>
                        <tbody>
                            { users.map((user, index) =>(
                                <tr key={index}>
                                    <td>{index + 1 }</td>
                                    <td>{user.name} </td>
                                    <td>{user.email}</td>
                                    <td>{user.phone_number}</td>
                                    <td>{user.isAdmin ? (<i className="fa fa-check" style={{color: 'green'}} > </i> ) : ( <i className="fa fa-times" style={{color: 'red'}} ></i> ) }</td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user.id}`} >
                                            <Button variant='light' className='btn'>
                                                <i className="fa fa-edit" style={{color: 'black'}} ></i> 
                                            </Button>                                      
                                        </LinkContainer>
                                        <Button variant='danger' onClick={() => deleteHandler(user.id) }>
                                            <i className="fa fa-trash"  ></i> 
                                        </Button> 
                                        

                                    </td>
                                </tr>  
                            ) )}                             
                        </tbody>
                    </Table>
                )
            }   
            
        </div>
    )
}



export default UserListScreen

