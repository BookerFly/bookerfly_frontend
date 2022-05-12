import { Button, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BookDetail.css'
import { borrowBookApi, selectBookApi } from '../../api/bookerflyApi';

const borrowBook = (bookTitle, bookId, bookInfoId, setStatus) => {
	borrowBookApi(bookTitle, bookId, response => {
		update(bookInfoId, setStatus, bookId)
		toast("Borrow Success !", { hideProgressBar: true });
	}, error => {
		toast.error(error.response.data, { hideProgressBar: true });
		console.error("borrowBook", error);
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

const BookDetailTable = ({ books, setFlag, bookTitle, bookInfoId }) => {
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
							setFlag={setFlag}
						/>
					)
				})}
			</tbody>
		</table>
	)
}

const BookItem = ({ bookIndex, bookTitle, bookId, bookInfoId, bookStatus, bookshelfNumber, bookshelfPosition, setFlag }) => {
	const [status, setStatus] = useState(bookStatus);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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
					<Button onClick={() => handleShow()}>借書</Button>
					<Modal show={show} onHide={handleClose} animation={false}>
						<Modal.Header closeButton>
							<Modal.Title>借書</Modal.Title>
						</Modal.Header>
						<Modal.Body>你要借書嗎?</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}> No </Button>
							<Button variant="primary" onClick={() => {
								borrowBook(bookTitle, bookId, bookInfoId, setStatus)
								handleClose()
							}}> Yes
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
			</th>
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

const BookDetail = ({ setFlag }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { bookInformation, books, image } = location.state;
	return (
		<React.Fragment>
			<Button className="previous-page-btn" onClick={() => navigate(-1)}> 回搜尋結果 </Button>
			<div className="book-container">
				<div className="book-information-container">
					<img className="book-image" src={image} />
					<BookInformation bookInformation={bookInformation} />
				</div>
				<BookDetailTable books={books} setFlag={setFlag} bookTitle={bookInformation.title} bookInfoId={bookInformation.bookInfoId} />
			</div>
			<ToastContainer autoClose={2000} />
		</React.Fragment>
	)
}

export default BookDetail;