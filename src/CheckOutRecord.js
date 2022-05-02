import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {BiBookReader} from 'react-icons/bi'

const fetchCheckOutRecord = (setCheckOutRecords) => {
    // axios.get(`http://localhost:8080/bookerfly/`).then(response => {
    //     console.log(response.data)
    //     setCheckOutRecords(response.data)
    // }).catch(error => console.error(error));
    setCheckOutRecords([
        {
            "title": "OOAD",
            "checkOutTime": "2022/04/30",
            "returnDate": "2022/05/02"
        },
        {
            "title": "SA",
            "checkOutTime": "2022/01/01",
            "returnDate": "2022/02/01"
        },
        {
            "title": "DDD",
            "checkOutTime": "2022/01/01",
            "returnDate": "Still renting"
        }
    ])
}

const CheckOutRecord = () => {
    const [checkOutRecords, setCheckOutRecords] = useState([])
    useEffect(() => {
        fetchCheckOutRecord(setCheckOutRecords)
    }, [])
    console.log("checkOutRecords", checkOutRecords)
    return (
        <React.Fragment>
            <div className="record-container">
                <div className="record-title">
                    <BiBookReader size={50}/>
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
