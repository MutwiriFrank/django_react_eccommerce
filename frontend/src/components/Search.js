import React , { useState, useEffect , useRef }from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, location, useLocation } from 'react-router-dom'
import { Form,  } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import '../css/Header.css'
import { Search as Search2,  } from 'react-bootstrap-icons'
import { listAjaxProducts, } from '../actions/productActions'




function Search() {

    const [keyword, setKeyword] = useState('')
    const [isOpen, setIsOpen] = useState(true)


    let history = useHistory()

    // use this coode to change state of ajax products to false
    // useEffect(() => {
    //    return history.listen((location) => { 
    //       console.log(`You changed the page to: ${location.pathname}`) 
    //    }) 
    // },[history]) 

    const ajaxProductList = useSelector(state => state.ajaxProductList )
    const { ajaxProducts } =  ajaxProductList
  
    const dispatch = useDispatch()

    const submitHandler = (e) =>{
        e.preventDefault();
        if (keyword) {
            history.push(`/?keyword=${keyword}&page=1`) //send user to homepage and do a get request. when we search we start on page =1
        }else{
            history.push(history.push(history.location.pathname)) // if search is clicked and nothing is typed, the user is redirected to same location he is.
        }
    }

    const menuRef = useRef()
    useEffect(() => {
        if (keyword) {
            let ajaxkeyword = `?keyword=${keyword}`   
            dispatch(listAjaxProducts( ajaxkeyword ))
            setIsOpen(true)
        }
        
    }, [dispatch, keyword])


   useEffect(() => {

    document.addEventListener("mousedown", (event) =>{
        
       try{
            if(!menuRef.current.contains(event.target)){
                console.log("clicked")
                setIsOpen(false)
            }else{
                
            }
       }catch(error){
        
       }
        
    } )
    
}, [ menuRef,])

    return (
        
        <div className="header_search_ajax" >
            <Form onClick = {() => setIsOpen(true) }  onSubmit={submitHandler} className="header__search" inline >
                    <input className="header__searchInput" type="text" name='q'
                    onChange =  {(e) => setKeyword(e.target.value)} >
                    </input>            
                    <button className="search__btn" type='submit' ><Search2 className="header__searchIcon" size={22} /> </button> 
            </Form>
            {isOpen ?  

                ajaxProducts &&

                <div ref={menuRef} className='ajax_search_result_div' >
                
                    {ajaxProducts.map(product=>(
                        <li className="ajax_search_item" key={product.pk} >
                            <Link  className="ajax_search_item_link" to={`/product/${product.pk}`}>
                                {product.name}
                            </Link>
                        </li>
                       
                    ))} 

                </div>
                    
                 : null
             }
            
        </div>
                
    )
}

export default Search
