import React, { useState, useEffect } from 'react';
import { BiBookReader } from 'react-icons/bi'
import { getCheckoutRecordByUserIdApi, returnBookApi } from '../../api/bookerflyApi';
import { ToastContainer, toast } from 'react-toastify';
import './CheckOutRecord.css'
import BookerFlyButton from '../../common/BookerFlyButton';

const fetchCheckOutRecord = (setCheckOutRecords) => {
	getCheckoutRecordByUserIdApi("userId", response => {
		let result = []
		console.log("response.data", response.data)
		response.data.forEach(record => {
			result.push({
				"title": record.bookTitle,
				"bookId": record.bookId,
				"userId": record.userId,
				"checkOutTime": new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(record.borrowTimestamp * 1000),
				"bookStatus": translateBookStatus(record.bookStatus, record.returnTimestamp)
			})
		})
		setCheckOutRecords(result)
	}, error => console.error(error))
}

const returnBook = (bookId, userId, index, checkOutRecords, setCheckOutRecords) => {
	returnBookApi(bookId, userId, response => {
		let checkOutRecord = {...checkOutRecords[index], bookStatus: "處理中"};
		checkOutRecords[index] = checkOutRecord;
		setCheckOutRecords(checkOutRecords);
		toast(response.data, { hideProgressBar: true });
	}, error => {
		toast.error(error.response.data, { hideProgressBar: true });
	})
}

const translateBookStatus = (bookStatus, returnTimestamp) => {
	switch(bookStatus) {
		case "AVAILABLE": 
			return "已歸還" + " (" + new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(returnTimestamp * 1000) + ")";
		case "CHECKED_OUT":
			return "借閱中";
		case "PROCESSING":
			return "處理中";
		case "MISSING":
			return "掛失";
		default:
			return "";
	}
}

const CheckOutRecordTable = ({ checkOutRecords, setCheckOutRecords }) => {
	return (
		<table class="styled-table">
			<thead>
				<tr>
					<th>序號</th>
					<th>書名</th>
					<th>借閱日期</th>
					<th>借閱狀態</th>
				</tr>
			</thead>
			<tbody>
				{checkOutRecords.map((checkOutRecord, index) => {
					const { title, bookId, userId, checkOutTime, bookStatus } = checkOutRecord
					return (
						<CheckOutRecordItem
							index={index + 1}
							title={title}
							bookId={bookId}
							userId={userId}
							checkOutTime={checkOutTime}
							bookStatus={bookStatus}
							checkOutRecords={checkOutRecords}
							setCheckOutRecords={setCheckOutRecords}
						/>
					)
				})}
			</tbody>
		</table>
	)
}

const CheckOutRecordItem = ({ index, title, bookId, userId, checkOutTime, bookStatus, checkOutRecords, setCheckOutRecords }) => {
	return (
		<tr>
			<th>{index}</th>
			<th>{title}</th>
			<th>{checkOutTime}</th>
			<th className="book-status-th">{bookStatus}
				{
					bookStatus === "借閱中" && 
					<BookerFlyButton content="還書" backgroundColor="#89abe3" color="white" onClick={() => returnBook(bookId, userId, index - 1, checkOutRecords, setCheckOutRecords)}/>
				}
			</th>
		</tr>
	)
}

const CheckOutRecord = () => {
	const [checkOutRecords, setCheckOutRecords] = useState([])
	useEffect(() => {
		fetchCheckOutRecord(setCheckOutRecords)
	}, [checkOutRecords])

	return (
		<React.Fragment>
			<div className="record-container">
				<div className="record-title">
					<BiBookReader size={100} />
					<h2>借閱紀錄</h2>
				</div>
				<CheckOutRecordTable checkOutRecords={checkOutRecords} setCheckOutRecords={setCheckOutRecords} />
			</div>
			<ToastContainer autoClose={2000} />
		</React.Fragment>
	)
}

export default CheckOutRecord;
