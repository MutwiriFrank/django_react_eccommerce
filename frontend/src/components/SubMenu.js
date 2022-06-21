import React, {useState} from 'react'
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SidebarLink = styled(Link)`
margin-left: 0.5rem; 
margin-top: 8px;
margin-bottom: -8px;
display: flex;
color: white;
justify-content: space-between;
align-items: center;
padding-left: 5px;
padding-right: 5px;
list-style: none;
height: 45px;
text-decoration: none;
font-weight: bold;

&:hover {
    background: rgb(64, 64, 68);
    border-left: 4px solid ;
    cursor: pointer;
    color: white;
    transition-delay:0.2s;
}

`;

const SidebarLabel = styled.span`

`
const SidebarDiv = styled.div`
border-bottom: 1px solid white;
border-radius-right-top: 10px
`

const DropdownLink = styled(Link)`
    margin-left: 0.7rem; 
    height: 30px;
    padding-left: 0.8rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
    font-size: 16px;

    &:hover {
        background: rgb(64, 64, 68);
        cursor: pointer;
        color: white;
        transition-delay:0.2s;
    }
`

function SubMenu({item}) {
    const [subNav, setSubnav] = useState(false)

    const showSubnav = () => setSubnav(!subNav)
    const hideSubnav = () => setSubnav(false)
    return (
        <>
            <SidebarLink to={'#'} onClick={item.subcategory && showSubnav } >
                <SidebarLabel>{item.name}</SidebarLabel>
                <div>
                    {item.subcategory && subNav 
                        ? item.iconOpened
                        : item.subcategory
                        ? item.iconClosed
                        : null
                    }
                </div>
            </SidebarLink>

            {subNav && item.subcategory.map((item, index) => {
                return (
                    <SidebarDiv  key={index}>
                        <DropdownLink to={`/subcategory/${item.id}`}>
                            <SidebarLabel>{item.name }</SidebarLabel>

                        </DropdownLink>
                    
                    </SidebarDiv>
                    

                )
            }) }
            
        </>
    )
}

export default SubMenu
