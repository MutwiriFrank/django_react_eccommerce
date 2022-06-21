import React, { useState, useEffect } from 'react'
import { LinkContainer} from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Table, Button, Col, Row} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listProducts, deleteProduct } from '../actions/productActions'


function ProductListScreen( {history, match} ) { 

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDelete = useSelector(state => state.productDelete )
    const {loading: deleteLoading, error: deleteError, success: successDelete } = productDelete

        
    // const productDelete = useSelector(state => state.userDelete)
    // const { success:success_delete, error:delete_error } = productDelete
    if (successDelete){
        console.log("success", successDelete)
    }

    let keyword = history.location.search

    useEffect(() => {
        if (userInfo && userInfo.isAdmin ) {
            dispatch(listProducts(keyword))
        }else{
            history.push('/login')
        }
        
    }, [dispatch, history, userInfo, successDelete, keyword] )

    
    const deleteHandler = (pk) =>{
        if(window.confirm("Are you sure you want to delete this user? ")){
            dispatch(deleteProduct(pk))
        }
        
    }

    const createProductHandler = (product) =>{
        history.push('product/create')
    }

    return (
        
        <div className='allign-items-center' > 
            <Row>
                <Col> <h1>Products</h1> </Col>
                <Col className='text-right' > 
                    <Button onClick={createProductHandler} >  <i className='fa fa-plus' ></i> Create Product</Button>

                </Col>
            </Row>
            { deleteLoading && <Loader />}
            { deleteError && <Message>{error}</Message> }

            {loading  ? 
                <Loader />           
                : error ?<Message  variant='danger'>{error}</Message>
                : !products ? <Message>Kindly reload to view the Products</Message>
                :(
                    <div>
                    <Table responsive className='table-sm' bordered hover size="sm" >
                        <thead>
                            <tr>
                                <th></th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Count</th>
                                <th>Dealer</th>
                                <th></th>
                            </tr>                      
                        </thead>
                        <tbody>
                            { products.map((product, index) => (
                                <tr key={index}>
                                    <td>{index + 1 }</td>
                                    <td>{product.pk} </td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category.name}</td>
                                    <td>{product.countInStock}</td>
                                    <td>{product.dealer.shop_name}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/edit/${product.pk}`} >
                                            <Button variant='light' className='btn'>
                                                <i className="fa fa-edit" style={{color: 'black'}} >edit</i> 
                                            </Button>                                      
                                        </LinkContainer>
                                        <Button variant='danger' onClick={() => deleteHandler(product.pk) }>
                                            <i className="fa fa-trash"  ></i> 
                                        </Button> 
                                        
                                    </td>
                        
                                </tr>  
                            ) )}                             
                        </tbody>
                    </Table>
                    <Paginate pages={pages} page={page} isAdmin={true}  />
                    </div>
                )
            }   
            
        </div>
    )
}



export default ProductListScreen

