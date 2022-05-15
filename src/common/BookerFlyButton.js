import React from 'react';
import './styles.css'

const BookerFlyButton = ({content="button", onClick, backgroundColor, color}) => {
    return (
        <button className="bookerfly-btn" onClick={onClick}
                style={{backgroundColor: backgroundColor,
                        color: color}} >
            {content}
        </button> 
    )
}

export default BookerFlyButton;
