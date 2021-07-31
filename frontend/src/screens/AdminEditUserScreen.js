import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails } from '../actions/userActions'
import FormContainer from '../components/FormContainer'


function AdminEditUserScreen({match, history}) {

    const userId = Number(match.params.id)  
    const [name, setName] = useState('')
    const [user_name, setUsername] = useState('')
    const [phone_number, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()



    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    console.log("userId", userId)
    console.log("user.id", user.id)

    useEffect(() => {
            if(user && user.id === userId ){
                setName(user.name)
                setUsername(user.user_name) 
                setEmail(user.email)
                setPhone(user.phone_number)


            }else{
                dispatch(getUserDetails(userId.toString()))  

                
            }
        }, [dispatch, userId, user])

    // useEffect(() => {
    //     if( !user.id !== userId ){
    //         dispatch(getUserDetails(userId.toString())) 
            
    //     }else{
    //         console.log("user-else", user.id)
    //         setName(user.name)
    //         setUsername(user.user_name) 
    //         setEmail(user.email)
    //         setPhone(user.phone_number)

    //     }
     
    // }, [ userId, user])

    const submitHandler = (e) =>{
        e.preventDefault()
        console.log("Clicked")
      
    }



    return (
        <div>

            <Link to='/admin/userlist'>
                Go back
            </Link>        
            <FormContainer>
                <h1>Edit User</h1>
                { loading ? <Loader /> : error ? <Message variant='danger' >{error}</Message> : (

                    <Form onSubmit={ submitHandler }>
                        <Form.Group controlId='name'>
                            <Form.Label>Name </Form.Label>
                                <Form.Control type='text' placeholder='Enter your name' value={name}  onChange={(e) => setName(e.target.value) } >

                                </Form.Control>
                        </Form.Group >

                        <Form.Group controlId='user_name'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type='text' placeholder='Enter a unique username' value={user_name}  onChange={(e) => setUsername(e.target.value) } >

                            </Form.Control>
                        </Form.Group >


                        <Form.Group controlId='email'>
                            <Form.Label>Email Addresss</Form.Label>
                            <Form.Control type='email' placeholder='Enter email' value={email}  onChange={(e) => setEmail(e.target.value) } >

                            </Form.Control>
                        </Form.Group >

                        <Form.Group controlId='phone_number'>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type='phone' placeholder='Enter phone number' value={phone_number}  onChange={(e) => setPhone(e.target.value) } >

                            </Form.Control>

                        </Form.Group >

                        <Button type='submit' style={{marginTop : "10px"}} variant='success'>Update</Button>

                    </Form>

                )  }
                

                <Row className = 'py-3'>
                    <Col>
                        Kindly confirm you are editing the right user
                    
                    </Col>

                </Row>
                
            </FormContainer>
        </div>
    )
}

export default AdminEditUserScreen
