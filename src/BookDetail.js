import React from 'react'
import { useLocation } from 'react-router';

const BookDetail = () => {
    const location = useLocation();
    const { bookInformation, books, image } = location.state;
    return (
        <React.Fragment>
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

export default BookDetail;