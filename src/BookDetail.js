import React, { useState, useEffect } from 'react'
import AppNavbar from './AppNavbar';
import { Button, Card } from 'react-bootstrap';
import { useLocation } from 'react-router';

const BookDetail = () => {
    const location = useLocation();
    const { bookInformation, books, image } = location.state;
    return (
        <React.Fragment>
            <AppNavbar />
            <div className="book-container">
                <div className="book-information-container">
                    <img className="book-image" src={image} />
                    <BookInformation bookInformation={bookInformation} />
                </div>
                <BookDetailTable books={books} />
            </div>
        </React.Fragment>
    )
}

const BookDetailTable = ({ books }) => {
    return (
        <table class="styled-table">
            <thead>
                <tr>
                    <th>序號</th>
                    <th>書架地點</th>
                    <th>書架號碼</th>
                    <th>目前狀態</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => {
                    const { bookId, bookInfoId, bookStatus, bookshelfNumber, bookshelfPosition } = book
                    return (
                        <BookItem
                            bookIndex={index}
                            bookId={bookId}
                            bookInfoId={bookInfoId}
                            bookStatus={bookStatus}
                            bookshelfNumber={bookshelfNumber}
                            bookshelfPosition={bookshelfPosition}
                        />
                    )
                })}
            </tbody>
        </table>
    )
}

const BookItem = ({ bookIndex, bookId, bookInfoId, bookStatus, bookshelfNumber, bookshelfPosition }) => {
    return (
        <tr>
            <th>{bookIndex}</th>
            <th>{bookshelfPosition}</th>
            <th>{bookshelfNumber}</th>
            <th>{bookStatus}</th>
        </tr>
    )
}

const BookInformation = ({ bookInformation }) => {
    const { title, author, isbn, type, image, bookInfoId } = bookInformation
    return (
        <div className="book-information-detail">
            <h3>{title}</h3>
            <div>作者: {author}</div>
            <div>類別: {type}</div>
            <div>ISBN: {isbn}</div>
        </div>
    )
}

// const BookDetail = ({ route, navigation }) => {
//     const { bookInformation, books, image} = route.params;
//     return (
//         <React.Fragment>
//             <AppNavbar/>
//             <div className="book-container"> 
//                <div className="book-information">                    
//                     <Card className="book-image" >
//                         <Card.Img variant="top" src={image} />
//                     </Card>                    
//                     <div>HEllo {bookInformation.title}</div>
//                 </div>
//                 <div className="book-detail-table">
//                     <div>books {books[0].bookStatus}</div>
//                 </div> 
//             </div>
//         </React.Fragment>
//     )
// }

export default BookDetail;