import React from 'react'
import { Row, Col, Card,Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../css/TopCategories.css'

function TopCategories() {
    return (
        <Container >
        <Container >
            <div  className= " top__categories">
            <p className ="top__categoriesHeader" >Top Categories</p>
            <Row className="cart_row" >
            
            <Col  xs={6} sm={6} md={6} lg={3} >
                <Card className="top__categoriesCard">
                    <Link to={`/`}>
                        <Card.Img src="images/alexa.jpg" alt="" />
                    </Link>

                    <div className="text__div" >
                        <Link to={`/`}>
                            
                            <p className="top__categoryCategoriesName">Wallpapers</p>
                    
                        </Link>
                    </div>
                        
                              
                </Card>
            </Col>
            <Col  xs={6} sm={6} md={6} lg={3} >
            <Card className="top__categoriesCard" >
                <Link to={`/`}>
                    <Card.Img src="images/mouse.jpg" alt="" />
                </Link>
                
                <div className="text__div" >
                <Link to={`/`}>
                    
                    <p className="top__categoryCategoriesName">Wallpapers</p>
            
                </Link>
            </div>

                            
            </Card>
            </Col>            
            <Col  xs={6} sm={6} md={6} lg={3} >
                    <Card className="top__categoriesCard">
                    <Link to={`/`}>
                        <Card.Img src="images/alexa.jpg" alt="" />
                    </Link>

                    <div className="text__div" >
                        <Link to={`/`}>
                            
                            <p className="top__categoryCategoriesName">Wallpapers</p>
                    
                        </Link>
                    </div>                                 
                </Card>
            </Col>
            <Col  xs={6} sm={6} md={6} lg={3} >
                <Card className="top__categoriesCard" >
                    <Link to={`/`}>
                        <Card.Img src="images/phone.jpg" alt=""  />
                    </Link>

                    <div className="text__div" >
                        <Link to={`/`}>
                            
                            <p className="top__categoryCategoriesName">Wallpapers</p>
                    
                        </Link>
                    </div>                                    
                </Card>
            </Col>
            
            
            </Row>

            </div>
        </Container>
        </Container>
    )
}

export default TopCategories
