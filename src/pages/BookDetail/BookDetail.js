import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BookDetail.css';
import { borrowBookApi, selectBookApi, reserveBookApi, addFavoriteBookApi, removeFavoriteBookApi, getBorrowerApi } from '../../api/bookerflyApi';
import BookerFlyButton from '../../common/BookerFlyButton';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { Modal } from 'react-bootstrap';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const fetchBooks = (bookInfoId, setBooks) => {
	selectBookApi(bookInfoId, response => {
		setBooks(response.data);
	}, error => console.error(error))
}

const borrowBook = (bookTitle, bookId, bookInfoId, setStatus) => {
	borrowBookApi(bookTitle, bookId, response => {
		update(bookInfoId, setStatus, bookId)
		toast("Borrow Success !", { hideProgressBar: true });
	}, error => {
		toast.error(error.response.data, { hideProgressBar: true });
		console.error("borrowBook", error);
	})
}

const reserveBook = (bookId) => {
	reserveBookApi(bookId, sessionStorage.getItem("userId"), response => {
		toast("Reserve Success !", { hideProgressBar: true });
	}, error => {
		toast.error(error.response.data, { hideProgressBar: true });
		console.error("reserveBook", error);
	})
}

const update = (bookInfoId, setStatus, bookId) => {
	selectBookApi(bookInfoId, response => {
		let bookStatus = response.data.find(x => x.bookId === bookId).bookStatus
		setStatus(bookStatus)
	}, error => {
		console.error(error);
	})
}

const addFavoriteBook = (userId, bookInfoId, setIsFavoriteBook) => {
	addFavoriteBookApi(userId, bookInfoId, response => {
		toast("Add Favorite Book Success !", { hideProgressBar: true });
		setIsFavoriteBook(true);
	}, error => {
		toast.error(error.response.data, { hideProgressBar: true });
		console.error("addFavorite", error);
	})
}

const removeFavoriteBook = (userId, bookInfoId, setIsFavoriteBook) => {
	removeFavoriteBookApi(userId, bookInfoId, response => {
		toast("Remove Favorite Book Success !", { hideProgressBar: true });
		setIsFavoriteBook(false);
	}, error => {
		toast.error(error.response.data, { hideProgressBar: true });
		console.error("removeFavorite", error);
	})
}

const BookDetailTable = ({ books, bookTitle, bookInfoId }) => {
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
					const { bookId, bookStatus, bookshelfNumber, bookshelfPosition } = book
					return (
						<BookItem
							bookIndex={index + 1}
							bookTitle={bookTitle}
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

const BookItem = ({ bookIndex, bookTitle, bookId, bookInfoId, bookStatus, bookshelfNumber, bookshelfPosition }) => {
	const [status, setStatus] = useState(bookStatus);
	const [borrowShow, setBorrowShow] = useState(false);
	const [reserveShow, setReserveShow] = useState(false);
	const handleBorrowClose = () => setBorrowShow(false);
	const handleBorrowShow = () => setBorrowShow(true);
	const handleReserveClose = () => setReserveShow(false);
	const handleReserveShow = () => setReserveShow(true);
	const canBorrow = (status) => status === "AVAILABLE"
	const canReserve = (status) => status === "CHECKED_OUT" || status === "PROCESSING" || status === "RESERVED"

	return (
		<tr>
			<th>{bookIndex}</th>
			<th>{bookshelfPosition}</th>
			<th>{bookshelfNumber}</th>
			<th>
				<div className="book-status-th">
					{status}
					{canBorrow(status) && <BookerFlyButton content="借書" onClick={() => handleBorrowShow()} backgroundColor="#89ABE3" color="white" />}
					{canReserve(status) && <BookerFlyButton content="預約" onClick={() => handleReserveShow()} backgroundColor="#f4b794" color="white" />}
					<Modal show={borrowShow} onHide={handleBorrowClose} animation={false}>
						<Modal.Header closeButton>
							<Modal.Title>借書</Modal.Title>
						</Modal.Header>
						<Modal.Body>你要借書嗎?</Modal.Body>
						<Modal.Footer>
							<BookerFlyButton content="No" backgroundColor="#a8b0ae" onClick={handleBorrowClose} color="white" />
							<BookerFlyButton content="Yes" backgroundColor="#89ABE3" color="white"
								onClick={() => {
									borrowBook(bookTitle, bookId, bookInfoId, setStatus)
									handleBorrowClose()
								}} />
						</Modal.Footer>
					</Modal>

					<Modal show={reserveShow} onHide={handleReserveClose} animation={false}>
						<Modal.Header closeButton>
							<Modal.Title>預約</Modal.Title>
						</Modal.Header>
						<Modal.Body>你要預約嗎?</Modal.Body>
						<Modal.Footer>
							<BookerFlyButton content="No" backgroundColor="#a8b0ae" onClick={handleReserveClose} color="white" />
							<BookerFlyButton content="Yes" backgroundColor="#f4b794" color="white"
								onClick={() => {
									reserveBook(bookId)
									handleReserveClose()
								}} />
						</Modal.Footer>
					</Modal>
				</div>
			</th>
		</tr>
	)
}

const BookInformation = ({ bookInformation, image, isFavoriteBook, setIsFavoriteBook }) => {
	// const { title, author, isbn, type, image, bookInfoId } = bookInformation
	const { title, author, isbn, type, bookInfoId } = bookInformation
	let userId = sessionStorage.getItem("userId")
	return (
		<div className="book-information-container book-detail">
			<img className="book-image" src={image} />
			<div className="book-information-detail">
				<h3>{title}</h3>
				<div>作者: {author}</div>
				<div>類別: {type}</div>
				<div>ISBN: {isbn}</div>
			</div>
			{
				isFavoriteBook ?
				<AiFillHeart className="favorite-book-btn" size="60" onClick={() => removeFavoriteBook(userId, bookInfoId, setIsFavoriteBook)}/>
				:
				<AiOutlineHeart className="favorite-book-btn" size="60" onClick={() => addFavoriteBook(userId, bookInfoId, setIsFavoriteBook)}/>
			}
		</div>
	)
}

const BookDetail = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { bookInformation, image } = location.state;
	const [books, setBooks] = useState([]);
	const [isFavoriteBook, setIsFavoriteBook] = useState(false);
	let userId = sessionStorage.getItem("userId")

	useEffect(() => {
		fetchBooks(bookInformation.bookInfoId, setBooks);
		
		getBorrowerApi(userId, response => {
			setIsFavoriteBook(response.data.favoriteList.bookInfoList.some(x => x.bookInfoId === bookInformation.bookInfoId)) 
		}, error => {})
	}, [])

	return (
		<React.Fragment>
			<IoArrowBackCircleOutline className="previous-page-btn" size="60" onClick={() => navigate(-1)} />
			<div className="book-container">
				<BookInformation bookInformation={bookInformation} image={image} isFavoriteBook={isFavoriteBook} setIsFavoriteBook={setIsFavoriteBook}/>
				<BookDetailTable books={books} bookTitle={bookInformation.title} bookInfoId={bookInformation.bookInfoId} />
			</div>
			<ToastContainer autoClose={2000} />
		</React.Fragment>
	)
}

export default BookDetail;