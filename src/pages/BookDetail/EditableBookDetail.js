import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BookDetail.css';
import { editBookApi, selectBookApi, createBookApi } from '../../api/bookerflyApi';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { BiEdit } from 'react-icons/bi';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { GrAddCircle } from 'react-icons/gr'

const fetchBooks = (bookInfoId, setBooks) => {
	selectBookApi(bookInfoId, response => {
		setBooks(response.data);
	}, error => console.error(error))
}

const handleEditBookSubmit = (bookId, bookInfoId, bookContent, setIsEditing, setBooks) => {
	setIsEditing(false);
	let isInvalid = false;
	for (const [key, value] of Object.entries(bookContent)) {
		if (!!!value) {
			toast.error(key + "欄位不得為空!", { hideProgressBar: true });
			isInvalid = true;
		}
	}
	if (isInvalid) {
		return;
	}
	editBookApi(bookId, bookContent, () => {
		toast("Edit Success !", { hideProgressBar: true });
		fetchBooks(bookInfoId, setBooks);
	}, (error) => {
		toast.error(error.response.data, { hideProgressBar: true });
	});
}

const handleAddBookSubmit = (bookContent, setIsAddingBook, setBooks) => {
	setIsAddingBook(false);
	let isInvalid = false;
	for (const [key, value] of Object.entries(bookContent)) {
		if (!!!value && key !== "image") {
			toast.error(key + "欄位不得為空!", { hideProgressBar: true });
			isInvalid = true;
		}
	}
	if (isInvalid) {
		return;
	}
	createBookApi(bookContent, () => {
		toast("Create Success !", { hideProgressBar: true });
		fetchBooks(bookContent.bookInfoId, setBooks);
	}, (error) => {
		toast.error(error.response.data, { hideProgressBar: true });
	});
}

const BookDetailTable = ({ books, bookInformation, setBooks }) => {
	const [isAddingBook, setIsAddingBook] = useState(false);
	const [bookContent, setBookContent] = useState(
		{
			"bookInfoId": bookInformation.bookInfoId,
			"title": bookInformation.title,
			"author": bookInformation.author,
			"ISBN": bookInformation.isbn,
			"image": bookInformation.image,
			"type": bookInformation.type,
			"bookshelfPosition": "",
			"bookshelfNumber": 0,
			"count": 1
		}
	);

	return (
		<table class="styled-table">
			<thead>
				<tr>
					<th className="book-index-th">序號</th>
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
							bookTitle={bookInformation.bookTitle}
							bookId={bookId}
							bookInfoId={bookInformation.bookInfoId}
							bookStatus={bookStatus}
							bookshelfNumber={bookshelfNumber}
							bookshelfPosition={bookshelfPosition}
							setBooks={setBooks}
						/>
					)
				})}
				<tr>
					{isAddingBook ?
						<React.Fragment>
							<th className="book-index-th">
								{books.length + 1}
							</th>
							<th>
								<InputGroup>
									<Form.Control onChange={(e) => setBookContent({ ...bookContent, bookshelfPosition: e.target.value })}
										placeholder="請輸入書架位置"
									/>
								</InputGroup>
							</th>
							<th>
								<InputGroup>
									<Form.Control onChange={(e) => setBookContent({ ...bookContent, bookshelfNumber: e.target.value })}
										placeholder="請輸入書架號碼"
									/>
								</InputGroup>
							</th>
							<th>
								<div className="book-status-th">
									<Form.Select defaultValue="AVAILABLE" disabled>
										<option value="AVAILABLE">可借閱</option>
									</Form.Select>
									<FaCheck size="35" onClick={() => handleAddBookSubmit(bookContent, setIsAddingBook, setBooks)} />
									<FaTimes size="30" onClick={() => setIsAddingBook(false)} />
								</div>
							</th>
						</React.Fragment>
						:
						<th colspan="4"><GrAddCircle size="30" onClick={() => setIsAddingBook(true)} /></th>
					}
				</tr>
			</tbody>
		</table>
	)
}

const BookItem = ({ bookIndex, bookTitle, bookId, bookInfoId, bookStatus, bookshelfNumber, bookshelfPosition, setBooks }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [bookContent, setBookContent] = useState(
		{
			"userId": "userId",
			"bookshelfPosition": bookshelfPosition,
			"bookshelfNumber": bookshelfNumber,
			"bookStatus": bookStatus
		}
	);
	return (
		<tr>
			<th className="book-index-th">{bookIndex}</th>
			{isEditing ?
				<React.Fragment>
					<th>
						<InputGroup>
							<Form.Control onChange={(e) => setBookContent({ ...bookContent, bookshelfPosition: e.target.value })}
								defaultValue={bookContent.bookshelfPosition}
								placeholder="請輸入書架位置"
							/>
						</InputGroup>
					</th>
					<th>
						<InputGroup>
							<Form.Control onChange={(e) => setBookContent({ ...bookContent, bookshelfNumber: e.target.value })}
								defaultValue={bookContent.bookshelfNumber}
								placeholder="請輸入書架號碼"
							/>
						</InputGroup>
					</th>
					<th>
						<div className="book-status-th">
							<Form.Select value={bookContent.bookStatus} onChange={(e) => setBookContent({ ...bookContent, bookStatus: e.target.value })}>
								<option value="AVAILABLE">可借閱</option>
								<option value="CHECKED_OUT">借閱中</option>
								<option value="PROCESSING">處理中</option>
								<option value="RESERVED">預約中</option>
								<option value="MISSING">掛失</option>
							</Form.Select>
							<FaCheck size="35" onClick={() => handleEditBookSubmit(bookId, bookInfoId, bookContent, setIsEditing, setBooks)} />
							<FaTimes size="30" onClick={() => setIsEditing(false)} />
						</div>
					</th>
				</React.Fragment>
				:
				<React.Fragment>
					<th>{bookContent.bookshelfPosition}</th>
					<th>{bookContent.bookshelfNumber}</th>
					<th>
						<div className="book-status-th">
							{bookContent.bookStatus}
							<BiEdit size="30" onClick={() => setIsEditing(true)} />
						</div>
					</th>
				</React.Fragment>
			}
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

const BookDetail = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { bookInformation, image } = location.state;
	const [books, setBooks] = useState([]);

	useEffect(() => {
		fetchBooks(bookInformation.bookInfoId, setBooks);
	}, [])

	return (
		<React.Fragment>
			<IoArrowBackCircleOutline className="previous-page-btn" size="60" onClick={() => navigate(-1)} />
			<div className="book-container">
				<div className="book-information-container">
					<img className="book-image" src={image} />
					<BookInformation bookInformation={bookInformation} />
				</div>
				<BookDetailTable books={books} bookInformation={bookInformation} setBooks={setBooks} />
			</div>
			<ToastContainer autoClose={2000} />
		</React.Fragment>
	)
}

export default BookDetail;