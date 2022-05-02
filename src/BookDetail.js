import { Button } from 'react-bootstrap';
import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router';
import axios from 'axios'

const BookDetail = ({setFlag}) => {
    // useEffect(() => {
    //     setFlag
    // }, [])
    const location = useLocation();
    const { bookInformation, books, image } = location.state;
    return (
        <React.Fragment>
            <div className="book-container">
                <div className="book-information-container">
                    <img className="book-image" src={image} />
                    <BookInformation bookInformation={bookInformation} />
                </div>
                <BookDetailTable books={books} setFlag={setFlag} />
            </div>
        </React.Fragment>
    )
}

const BookDetailTable = ({ books, setFlag }) => {
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
                            setFlag={setFlag}
                        />
                    )
                })}
            </tbody>
        </table>
    )
}

const BookItem = ({ bookIndex, bookId, bookInfoId, bookStatus, bookshelfNumber, bookshelfPosition, setFlag }) => {
    const [status, setStatus] = useState(bookStatus);
    useEffect(() => {
        setFlag(true)
    }, [status])
    return (
        <tr>
            <th>{bookIndex}</th>
            <th>{bookshelfPosition}</th>
            <th>{bookshelfNumber}</th>
            <th>
                <div className="book-status-th">
                    {status}
                    <Button onClick={() => borrowBook(bookId, bookInfoId, setStatus)}>借書</Button>
                </div>
            </th>
        </tr>
    )
}

const borrowBook = ( bookId, bookInfoId, setStatus ) => {
    console.log("Click", bookId);
    let userId = "userId";
    axios.post(`http://localhost:8080/bookerfly/collection/books/${bookId}/borrow?userId=${userId}`).then(response => {
      update(bookInfoId, setStatus, bookId)
    }).catch(error => console.error(error));
}

const update = (bookInfoId, setStatus, bookId) => {
    axios.get(`http://localhost:8080/bookerfly/collection/select/book-infos/${bookInfoId}`).then(response => {
        let bookStatus = response.data.find(x => x.bookId === bookId).bookStatus
        setStatus(bookStatus)
    }).catch(error => console.error(error));
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