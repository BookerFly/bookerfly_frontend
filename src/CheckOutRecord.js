import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {BiBookReader} from 'react-icons/bi'

const findBooksWithInfoByBookId = (targetBookIds, bookInfos, books) => {
    let result = []
    let targetBooks = books.filter(x => targetBookIds.includes(x.bookId))
    targetBooks.forEach(book => {
        let bookInformation = bookInfos.find(info => info.bookInfoId === book.bookInfoId)
        result.push({ ...book, bookInformation })
    })
    return result
}

const findBookWithInfoByBookId = (targetBookId, bookInfos, books) => {
    let targetBook = books.find(x => targetBookId === x.bookId)
    let bookInformation = bookInfos.find(info => info.bookInfoId === targetBook.bookInfoId)
    return {...targetBook, ...bookInformation}
}


const fetchCheckOutRecord = (bookInfos, books, setCheckOutRecords) => {
    let userId = "userId"
    axios.get(`http://localhost:8080/bookerfly/record/check-out-record?userId=${userId}`).then(response => {
        let result = []    
        response.data.forEach(record => {
            let book = findBookWithInfoByBookId(record.bookId, bookInfos, books) 
            result.push({
                "title": book.title,
                "checkOutTime": new Date(record.timestamp).toDateString(),
                "returnDate": record.bookStatus == "CHECKED_OUT" ? "Still checking out." : "Return"
            })
        })
        setCheckOutRecords(result)
    }).catch(error => console.error(error));
}

const CheckOutRecord = ({bookInfos, books}) => {
    const [checkOutRecords, setCheckOutRecords] = useState([])
    useEffect(() => {
        fetchCheckOutRecord(bookInfos, books, setCheckOutRecords)
    }, [])

    return (
        <React.Fragment>
            <div className="record-container">
                <div className="record-title">
                    <BiBookReader size={100}/>
                    <h2>CheckOutRecord</h2>
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
                    <th>歸還日期</th>
                </tr>
            </thead>
            <tbody>
                {checkOutRecords.map((checkOutRecord, index) => {
                    const { title, checkOutTime, returnDate } = checkOutRecord
                    return (
                        <CheckOutRecordItem
                            index={index}
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
