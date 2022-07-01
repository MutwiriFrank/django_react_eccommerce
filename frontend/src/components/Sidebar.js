import React, {useState, useEffect } from 'react'
import { listCategories, listRoomCategories } from '../actions/categoryAction'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'


import styled from 'styled-components'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import Search from './Search'
import '../css/Header.css'


import SubMenu from './SubMenu'

const DivOne = styled.div`
display: flex;
`

const Responsive_Search = styled.div`

    display: none
`

const P2 = styled.p`
    
    right: 0;
    position: absolute;


    @media (max-width: 650px){
        font-size: 12px;
        margin-top: 5px;
    }

`

const P3= styled.p`
@media (max-width: 650px){
    display: none;
}

`

const NavIcon = styled(Link)` 
margin-top: -6px;
    margin-left: 0.8rem;
    font-size: 1.5rem;
    height: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: black;

`;
const NavIconClose = styled(Link)`
   
    margin-right: 1rem;
    font-size: 1.5rem;
    height: 20px;
    display: flex;
 
    &:hover {
        font-size: 1.6rem;   
        color: black;
    }
 `

const Title = styled.p`
 text-decoration: None;
 font-size : 18px;
 font-weight: bold;
 padding-bottom: 0;

 color: Black;
 margin-left: 1rem;
 

`

const SidebarNav = styled.nav` 
    background: rgb(19, 25, 33);
    width: 250px;
    height: 92vh; 
    display: flex;
    justify-content: center;
    left: ${({sidebar}) => (sidebar ? '0' : '-100%')};
    position: fixed;
    top: 9vh;
    bottom: 0;
    max-height: calc(100vh - 9vh);
    transition: 350ms;
    z-index: 10;
    overflow-y: auto;
   
    `
const SidebarWrap = styled.div`
    width: 100%;
    

`
const SecondNav = styled.div`
height: 2.3rem;


`

const TitleDiv = styled.div`
padding-top: 0.5rem;
border-bottom: 1px solid white;
background: white;
display: flex;
justify-content: space-between;
`

function Sidebar() {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    const categories = useSelector(state => state.categories)
    const {error, loading, categories: sidebarCategories } = categories


    // const rooms = useSelector(state => state.rooms)
    // const { loading, rooms: sidebarRooms } = roomsdd

    const dispatch = useDispatch()

    useEffect(() => {

            if (listCategories.length ){

            }else{
                dispatch(listCategories())  
            }
    
         
    
    
    }, [dispatch,  ])


    return (
        <>
        
      
        { loading ? <FaIcons.FaBars  /> : error ? <Message variant='danger' >{error}</Message> : (
            <SecondNav>
                <div className= "smaller__nav">
                    
                        <NavIcon to="#">   
                            <FaIcons.FaBars onClick={showSidebar} />
                            
                        </NavIcon>
                        <P3>
                        All Categories
                        </P3>
                        

                    
                        
                    <div className="smallNav__search">
                        <Search />
                         
                    </div>
                    <P2>
                    0714175133
                    </P2>
                    
                </div>
                <SidebarNav sidebar={sidebar}>
                        <SidebarWrap>
                            
                            <TitleDiv>
                                <Title>All Categories</Title>

                                <NavIconClose to="#">
                                    <AiIcons.AiOutlineClose onClick={showSidebar} />
                                </NavIconClose>
                            
                            </TitleDiv>                    

                            {sidebarCategories.map((item, index) => {
                                return <SubMenu item={item} key={index} />;                           
                            })}
                        
                    
                        
                        </SidebarWrap>
                </SidebarNav>
                    
            </SecondNav>
            
            
            )}
           
        </>
    )
}

export default Sidebar
