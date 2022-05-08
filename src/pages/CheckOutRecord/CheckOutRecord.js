import React, { useState, useEffect } from 'react';
import { BiBookReader } from 'react-icons/bi'
import { getCheckoutRecordByUserIdApi } from '../../api/bookerflyApi';

const fetchCheckOutRecord = (setCheckOutRecords) => {
	getCheckoutRecordByUserIdApi("userId", response => {
		let result = []
		console.log("response.data", response.data)
		response.data.forEach(record => {
			result.push({
				"title": record.bookTitle,
				"checkOutTime": new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(record.timestamp * 1000),
				"returnDate": record.bookStatus === "CHECKED_OUT" ? "Still checking out." : "Return"
			})
		})
		setCheckOutRecords(result)
	}, error => console.error(error))
}

const CheckOutRecord = () => {
	const [checkOutRecords, setCheckOutRecords] = useState([])
	useEffect(() => {
		fetchCheckOutRecord(setCheckOutRecords)
	}, [])

	return (
		<React.Fragment>
			<div className="record-container">
				<div className="record-title">
					<BiBookReader size={100} />
					<h2>借閱紀錄</h2>
				</div>
				<CheckOutRecordTable checkOutRecords={checkOutRecords} />
			</div>
		</React.Fragment>
	)
}

const CheckOutRecordTable = ({ checkOutRecords }) => {
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
					const { title, checkOutTime, returnDate } = checkOutRecord
					return (
						<CheckOutRecordItem
							index={index + 1}
							title={title}
							checkOutTime={checkOutTime}
							returnDate={returnDate}
						/>
					)
				})}
			</tbody>
		</table>
	)
}

const CheckOutRecordItem = ({ index, title, checkOutTime, returnDate }) => {
	return (
		<tr>
			<th>{index}</th>
			<th>{title}</th>
			<th>{checkOutTime}</th>
			<th>{returnDate}</th>
		</tr>
	)
}

export default CheckOutRecord;
