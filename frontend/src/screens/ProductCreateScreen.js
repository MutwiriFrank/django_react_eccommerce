import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import { productCreateAction } from '../actions/productActions'

function ProductCreateScreen({history}) {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setcountInStock] = useState(0)
    const [dealer, setDealer] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('null')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo, } = userLogin

    const productCreate = useSelector(state => state.productCreate)
    const { success, error} = productCreate

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if ( !userInfo.isAdmin ) {
            history.push('/')
        }
        if (success){
            history.push('/admin/products')
        }
    }, [dispatch, history, userInfo, success ] )


    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(productCreateAction( name, price, description, countInStock, dealer, category, image  ))
        }


    
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={ submitHandler }>
                <Form.Group controlId='name'>
                    <Form.Label>Name </Form.Label>
                        <Form.Control  type='text' placeholder='Product name' value={name}  onChange={(e) => setName(e.target.value) } >

                        </Form.Control>
                </Form.Group >
                <Form.Group controlId='image'>
                    <Form.Label>Image </Form.Label>
                        <Form.Control  type='text' placeholder='Product image' value={image}  onChange={(e) => setImage(e.target.value) } >

                        </Form.Control>
                </Form.Group >
                
                <Form.Group controlId='price'>
                    <Form.Label>price</Form.Label>
                    <Form.Control  type='text' placeholder='price' value={price}  onChange={(e) => setPrice(e.target.value) } >

                    </Form.Control>
                </Form.Group >


                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control  type='text' placeholder='Product Description' value={description}  onChange={(e) => setDescription(e.target.value) } >

                    </Form.Control>
                </Form.Group >

                <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control  type='text' placeholder='Enter phone number' value={category}  onChange={(e) => setCategory(e.target.value) } >

                    </Form.Control>

                </Form.Group >

                <Form.Group controlId='countInStock'>
                    <Form.Label>PCount in Stock</Form.Label>
                    <Form.Control  type='text' placeholder='Count in stock' value={countInStock}  onChange={(e) => setcountInStock(e.target.value) } >

                    </Form.Control>

                </Form.Group >

                <Form.Group controlId='dealer'>
                    <Form.Label>Dealer</Form.Label>
                    <Form.Control  type='text' placeholder='Enter password' value={dealer}  onChange={(e) => setDealer(e.target.value) } >
                    </Form.Control>
                </Form.Group >

                

                <Button type='submit' style={{marginTop : "10px"}} variant='primary'>Add Product</Button>

            </Form>

            
        </FormContainer>
    )
}

export default ProductCreateScreen
