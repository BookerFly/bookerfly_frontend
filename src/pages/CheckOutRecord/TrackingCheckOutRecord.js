import React, { useState, useEffect } from 'react';
import { BiBookReader } from 'react-icons/bi'
import { getTrackingCheckoutRecordApi, editBookStatusApi, confirmReturnBookApi } from '../../api/bookerflyApi';
import { ToastContainer } from 'react-toastify';
import './CheckOutRecord.css'
import Form from 'react-bootstrap/Form'

const fetchCheckOutRecord = (setCheckOutRecords) => {
	getTrackingCheckoutRecordApi(response => {
		let result = []
		console.log(response.data)
		response.data.forEach(record => {
			result.push({
				"title": record.bookTitle,
				"bookId": record.bookId,
				"userId": record.userId,
				"checkOutTime": new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(record.borrowTimestamp * 1000),
				"bookStatus": record.bookStatus
			})
		})
		setCheckOutRecords(result);
	}, error => console.error(error))
}

const CheckOutRecordTable = ({ checkOutRecords, setCheckOutRecords }) => {
	return (
		<table class="styled-table">
			<thead>
				<tr>
					<th>序號</th>
					<th>書名</th>
                    <th>借閱者</th>
					<th>借閱狀態</th>
				</tr>
			</thead>
			<tbody>
				{checkOutRecords.map((checkOutRecord, index) => {
					const { title, bookId, userId, bookStatus } = checkOutRecord
					return (
						<CheckOutRecordItem
							index={index + 1}
							title={title}
							bookId={bookId}
							userId={userId}
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

const handleEditBook = (bookId, userId, value, setCheckOutRecords) => {
	if(value === "AVAILABLE") {
		confirmReturnBookApi(bookId, userId, () => {
			fetchCheckOutRecord(setCheckOutRecords);
		});
		return;
	} 
	editBookStatusApi(bookId, userId, value, () => {
		fetchCheckOutRecord(setCheckOutRecords);
	})
}

const CheckOutRecordItem = ({ index, title, bookId, userId, bookStatus, checkOutRecords, setCheckOutRecords }) => {
	return (
		<tr>
			<th>{index}</th>
			<th>{title}</th>
            <th>{userId}</th>
			<th className="book-status-th">
                <Form.Select value={bookStatus} onChange={(e) => handleEditBook(bookId, userId, e.target.value, setCheckOutRecords) }> 
                    <option value="AVAILABLE">已歸還</option>
                    <option value="PROCESSING">處理中</option>
                    <option value="MISSING">掛失</option>
                </Form.Select>
			</th>
		</tr>
	)
}

const TrackingCheckOutRecord = () => {
	const [checkOutRecords, setCheckOutRecords] = useState([]);

	useEffect(() => {
		fetchCheckOutRecord(setCheckOutRecords);
	}, [])

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

export default TrackingCheckOutRecord;