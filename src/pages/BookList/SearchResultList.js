import React from 'react'
import angryCat from '../../img/angry_cat.png'
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { selectBookApi } from '../../api/bookerflyApi';

const selectBook = (bookInformation, navigate) => {
	selectBookApi(bookInformation.bookInfoId, response => {
		navigate('/bookDetail', { state: { bookInformation, books: response.data, image: angryCat } });
	}, error => console.error(error))
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

const SearchResultList = ({ bookInfos }) => {
	const navigate = useNavigate();
	return (
		<React.Fragment>
			<div className="book-container">
				{bookInfos.length == 0 ? <h2>查無結果</h2> :
					bookInfos.map(bookInfo => {
						return (
							<div className="book-information-container-btn" onClick={() => selectBook(bookInfo, navigate)}>
								<img className="book-image" src={angryCat} />
								<BookInformation bookInformation={bookInfo} />
							</div>
						)
					})}
			</div>
		</React.Fragment>
	)
}

export default SearchResultList;