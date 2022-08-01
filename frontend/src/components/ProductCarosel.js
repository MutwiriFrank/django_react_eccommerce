import React, { useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image, Carousel, Row, Col } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { link} from 'react-router-dom'
import { getCaroselProducts } from '../actions/caroselActions'

function ProductCarousel() {
    const dispatch = useDispatch()

    const carosel = useSelector(state => state.carosel )
    const { error, loading,  caroselItems }   = carosel

    useEffect(() =>{
        dispatch(getCaroselProducts())
    }, [dispatch] )
    
    return (
        loading ? (<p></p>)
        : error ? <Message variant='danger' >{error}</Message> :(
            <div>
                <Row> 
                    <Carousel  pause='hover' className='bg-dark carousel' >
                        {caroselItems.map(item => (
                            <Carousel.Item key={item.id} >
                                <Image className="carosel__image" src={item.image} alt={item.name} fluid /> 
                                <Carousel.Caption>
                                    <h2>{item.name}</h2>
                                    <h5>{item.description}</h5>
                                </Carousel.Caption>

                            </Carousel.Item>
                        ))}
                    </Carousel>
                    
                
                
                </Row>
             
            </div>
        )
        
    )
}

export default ProductCarousel

