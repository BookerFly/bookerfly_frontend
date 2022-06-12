import React, { useState, useEffect } from 'react';
import angryCat from '../../img/angry_cat.png'
import './FavoriteList.css'
import { BiBookHeart } from 'react-icons/bi'
import { ToastContainer, toast } from 'react-toastify';
import BookerFlyButton from '../../common/BookerFlyButton';
import { useNavigate } from 'react-router-dom';
import { getBorrowerApi, selectBookApi, removeFavoriteBookApi } from '../../api/bookerflyApi';

const selectBook = (bookInformation, navigate) => {
	let role = sessionStorage.getItem("role")
	selectBookApi(bookInformation.bookInfoId, response => {
		navigate('/'+ role +'/bookDetail', { state: { bookInformation, books: response.data, image: angryCat } });
	}, error => console.error(error))
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

const BookInformation = ({ bookInformation, userId }) => {
	const [isFavoriteBook, setIsFavoriteBook] = useState(true);
	const { title, author, isbn, type, image, bookInfoId } = bookInformation
	return (
		<div className="book-information-detail">
			<div className="book-info">
				<h3>{title}</h3>
				<div>作者: {author}</div>
				<div>類別: {type}</div>
				<div>ISBN: {isbn}</div>
			</div>
			<div className="unfavorite-field" >
			{isFavoriteBook ?
				<BookerFlyButton content="取消收藏" onClick={() => removeFavoriteBook(userId, bookInfoId, setIsFavoriteBook)} backgroundColor="#a8b0ae" color="white" /> :
				<h5>已移除收藏書</h5>
			} 
			</div>
		</div>

	)
}

const FavoriteList = () => {
	const navigate = useNavigate();
	const [favoriteList, setFavoriteList] = useState([]);
	let userId = sessionStorage.getItem("userId");
	useEffect(() => {
		getBorrowerApi(userId, response => {
			setFavoriteList(response.data.favoriteList.bookInfoList)
		}, error => { })
	}, [])

	if (!sessionStorage.getItem("authenticated")) {
		navigate('/login');
		return (<div></div>);
	}

	return (
		<React.Fragment>
			<div className="record-container">
				<div className="record-title">
					<BiBookHeart size={100} />
					<h2>收藏書清單</h2>
				</div>
				{favoriteList.map(bookInfo => {
					return (
						<div className="book-information-container-btn" >
							<img className="book-image" src={angryCat} onClick={() => selectBook(bookInfo, navigate)}/>
							<BookInformation bookInformation={bookInfo} userId={userId}/>
						</div>
					)
				})}
			</div>
			<ToastContainer autoClose={2000} />
		</React.Fragment>
	)
}

export default FavoriteList;
