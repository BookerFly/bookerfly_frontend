import React from 'react';
import './styles.css'

const BookerFlyButton = ({content="button", onClick, backgroundColor, color, className}) => {
    return (
        <button className={"bookerfly-btn " + className}  onClick={onClick}
                style={{backgroundColor: backgroundColor,
                        color: color}} >
            {content}
        </button> 
    )
}

export default BookerFlyButton;
