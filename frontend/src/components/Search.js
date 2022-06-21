import React , { useState  }from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import '../css/Header.css'
import { Search as Search2,  } from 'react-bootstrap-icons'



function Search() {

    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    const submitHandler = (e) =>{
        e.preventDefault();
        if (keyword) {
            history.push(`/?keyword=${keyword}&page=1`) //send user to homepage and do a get request. when we search we start on page =1
        }else{
            history.push(history.push(history.location.pathname)) // if search is clicked and nothing is typed, the user is redirected to same location he is.
        }
    }
    return (
        
        <div className="header__search" >
            <Form onSubmit={submitHandler} className="header__search" inline >
                    <input className="header__searchInput" type="text" name='q'
                    onChange =  { (e) => setKeyword(e.target.value) } >
                    </input>            
                    <button className="search__btn" type='submit' ><Search2 className="header__searchIcon" size={22} /> </button> 
            </Form>
        </div>
    

            
    )
}

export default Search
