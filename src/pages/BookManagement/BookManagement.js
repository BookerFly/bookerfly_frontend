import React from 'react';
import { GrUserSettings } from 'react-icons/gr'
import { BiBookReader, BiBookAdd } from 'react-icons/bi'
import './BookManagement.css'
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const goToCheckOutRecordPage = (navigate) => {
    navigate('/trackingCheckOutRecord');
}

const goToBookAdderPage = (navigate) => {
    navigate('/bookAdder');
}

const BookManagement = () => {
    const navigate = useNavigate()
	return (
        <React.Fragment>
            <div className="management-container">
				<div className="management-title container-item">
                    <GrUserSettings size={80}/>
                    <div>
					    <h2 style={{fontWeight: "bold"}}>Hello!</h2>
					    <h3>Maneger</h3>
                    </div>
				</div>
                <div className="management-tool container-item">
                    <div className="tool-item" onClick={() => goToCheckOutRecordPage(navigate)}>
                        <BiBookReader size={80} className="icon-item"/>
                        <h3 className="text-item">Check Out Record</h3>
                    </div>
                    <div className="tool-item" onClick={() => goToBookAdderPage(navigate)}>
                        <BiBookAdd size={80} className="icon-item"/>
                        <h3 className="text-item">Add Book</h3>
                    </div>
				</div>
			</div>
            <ToastContainer autoClose={2000} />
        </React.Fragment>
	)
}

export default BookManagement;