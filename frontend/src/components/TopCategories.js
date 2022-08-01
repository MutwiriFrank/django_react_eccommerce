import React, {useEffect, } from 'react'
import { Row, Col, Card,Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../css/TopCategories.css'
import { listCategories } from '../actions/categoryAction'

function TopCategories() {

    const categories = useSelector(state => state.categories)
    const { loading, categories:mainCategories } = categories

    let topFourCategories = []

    if (mainCategories){
        let topCategories = mainCategories.sort((a, b) => (a.rating > b.rating) ? 1 : -1)
        topFourCategories = topCategories.slice(0, 4);
    }



    return (

            <div  className= " top__categories">
            <p className ="top__categoriesHeader" >Top Categories</p>
            <Row className="cart_row" >
            
            {
                topFourCategories.map(category=>(

                <Col key={category.id}  xs={6} sm={6} md={6} lg={3} >

                    <Card className="top__categoriesCard">
                        <Link to={`/category/${category.id}`}>
                            <Card.Img src={category.image} alt="" />
                        </Link>

                        <div className="text__div" >
                            <Link to={`/category/${category.id}`}>
                                <p className="top__categoryCategoriesName">{category.name}</p>
                        
                            </Link>
                        </div>
                            
                                
                    </Card>
            </Col>
            ))}  
            
            </Row>

            </div>
        
    )
}

export default TopCategories
