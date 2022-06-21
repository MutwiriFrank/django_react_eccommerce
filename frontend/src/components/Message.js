import React from 'react'
import { Alert } from 'react-bootstrap'
import '../css/Message.css'


function Message({variant, children}) {
    return (
        <Alert variant={variant} className="alert__div">
            <p className="ordinary_p" >{children}</p>
        </Alert>
    )
}

export default Message
