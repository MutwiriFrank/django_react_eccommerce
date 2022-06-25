import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import {PRODUCT_EDIT_RESET, PRODUCT_DETAILS_RESET } from '../constants/productConstants'

import { listProductDetails, productEditAction ,} from '../actions/productActions'
import Loader from '../components/Loader'

function ProductEditScreen({history, match }) {

    const productId = match.params.pk

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setcountInStock] = useState('')
    const [dealer, setDealer] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo, } = userLogin

    const productDetails = useSelector(state => state.productDetails)
    const { success, error, product} = productDetails

    const productEdit = useSelector(state => state.productEdit )
    const { success: editSuccess, error: editError, loading: editLoading} = productEdit

  
    useEffect(() => {
        dispatch({type:PRODUCT_EDIT_RESET })

        if ( !userInfo.isAdmin ) {
            history.push('/')
        }
        if ( editSuccess  ){
            dispatch({type:PRODUCT_DETAILS_RESET })

            history.push('/admin/products')
        }else{
            if(product && product.pk === Number(productId)){
                setName(product.name)
                setImage(product.image)
                setPrice(product.price)
                setDescription(product.description)
                setCategory(product.category)
                setDealer(product.dealer)
                setcountInStock(product.countInStock)
            }else{
                dispatch( listProductDetails(productId))

            }
        }
    }, [dispatch, history, userInfo, editSuccess, product, productId, success ] )


    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(productEditAction( {pk:product.pk, name, price, category, countInStock, dealer, description, image }))
        }
    
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image',file)
        formData.append('product_id', productId)

        setUploading(true)

        try {
            const accessToken = JSON.parse(localStorage.getItem("userInfoAccess"))
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${accessToken}`
                }
            }

            const { data } = await axios.post(
                '/api/store/product/edit_image/', formData, config
            )
            setImage(data)
            setUploading(false)
        }catch(error){

        }
    }

    
    return (
        <FormContainer>
                    {editError && <Message>{editError}</Message>  }
                    { editLoading && <Loader /> }
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

                        <Form.File
                            id='image-file'
                            label="Choose file"
                            custom
                            onChange={uploadFileHandler}
                        
                        >

                        </Form.File>

                        {uploading && <Loader />}
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
                    <Form.Control  type='text' placeholder='Enter category' value={category}  
                        onChange={(e) => setCategory(e.target.value) } >
                    </Form.Control>

                </Form.Group >

                <Form.Group controlId='countInStock'>
                    <Form.Label>Count in Stock</Form.Label>
                    <Form.Control  type='text' placeholder='Count in stock' value={countInStock}
                        onChange={(e) => setcountInStock(e.target.value) } >
                    </Form.Control>

                </Form.Group >

                <Form.Group controlId='dealer'>
                    <Form.Label>Dealer</Form.Label>
                    <Form.Control  type='text' placeholder='Enter password' value={dealer.shop_name}  onChange={(e) => setDealer(e.target.value) } >
                    </Form.Control>
                </Form.Group >

                

                <Button type='submit' style={{marginTop : "10px"}} variant='success'>Edit Product</Button>

            </Form>

            
        </FormContainer>
    )
}

export default ProductEditScreen
