import React, { useState } from 'react';
import './BookManagement.css'
import { BiBookAdd } from 'react-icons/bi'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BookerFlyButton from '../../common/BookerFlyButton';
import { ToastContainer, toast } from 'react-toastify';
import { createBookApi } from '../../api/bookerflyApi';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

const handleSumbit = (bookContent, handleShow) => {
    console.log(bookContent);
    let isInvalid = false;
    for (const [key, value] of Object.entries(bookContent)) {
        if (!!!value && key !== 'image') {
            toast.error(key + "欄位不得為空!", { hideProgressBar: true });
            isInvalid = true;
        }
    }
    if (isInvalid) {
        return;
    }
    createBookApi(bookContent, () => {
        handleShow();
    }, (error) => {
        toast.error(error.response.data, { hideProgressBar: true });
    });
}

const BookAdder = () => {
    const navigate = useNavigate();
    const [bookContent, setBookContent] = useState(
        {
            "title": "",
            "author": "",
            "ISBN": "",
            "image": "",
            "type": "Book",
            "bookshelfPosition": "",
            "bookshelfNumber": 0,
            "count": 0
        }
    );
    const [show, setShow] = useState(false);
	const handleClose = () => {
        setShow(false);
        navigate(-1);
    }
	const handleShow = () => setShow(true);
    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose} animation={false} backdrop="static">
                <Modal.Header>
                    <Modal.Title>新增書籍</Modal.Title>
                </Modal.Header>
                <Modal.Body>{bookContent.title} 新增成功!</Modal.Body>
                <Modal.Footer>
                    <BookerFlyButton content="返回功能選單" backgroundColor="#89ABE3" onClick={handleClose} color="white" />
                </Modal.Footer>
            </Modal>
            <div className="book-add-container">
                <div className="book-add-title">
                    <BiBookAdd size={80} className="icon-item" />
                    <h3 className="text-item">新增書籍</h3>
                </div>
                <div className="book-add-bookContent">
                    <Form>
                        <Form.Group as={Row} className="mb-4 book-add-row" controlId="formHorizontalEmail">
                            <Col xs={1}>
                                <Form.Label>書名</Form.Label>
                            </Col>
                            <Col xs={3}>
                                <Form.Control placeholder="Book Title" onChange={(e) => setBookContent({ ...bookContent, title: e.target.value })} />
                            </Col>
                            <Col xs={2} />
                            <Col xs={1}>
                                <Form.Label>書架位置</Form.Label>
                            </Col>
                            <Col xs={3}>
                                <Form.Control placeholder="Bookshlef Position" onChange={(e) => setBookContent({ ...bookContent, bookshelfPosition: e.target.value })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-4 book-add-row" controlId="formHorizontalEmail">
                            <Col xs={1}>
                                <Form.Label>作者</Form.Label>
                            </Col>
                            <Col xs={3}>
                                <Form.Control placeholder="Author" onChange={(e) => setBookContent({ ...bookContent, author: e.target.value })} />
                            </Col>
                            <Col xs={2} />
                            <Col xs={1}>
                                <Form.Label>書架號碼</Form.Label>
                            </Col>
                            <Col xs={3}>
                                <Form.Control placeholder="Bookshelf Number" type="number" onChange={(e) => setBookContent({ ...bookContent, bookshelfNumber: parseInt(e.target.value) })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-4 book-add-row" controlId="formHorizontalEmail">
                            <Col xs={1}>
                                <Form.Label>ISBN</Form.Label>
                            </Col>
                            <Col xs={3}>
                                <Form.Control placeholder="ISBN" onChange={(e) => setBookContent({ ...bookContent, ISBN: e.target.value })} />
                            </Col>
                            <Col xs={2} />
                            <Col xs={1}>
                                <Form.Label>數量</Form.Label>
                            </Col>
                            <Col xs={3}>
                                <Form.Control placeholder="Count" type="number" onChange={(e) => setBookContent({ ...bookContent, count: parseInt(e.target.value) })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-4 book-add-row" controlId="formHorizontalEmail">
                            <Col xs={1}>
                                <Form.Label>圖片</Form.Label>
                            </Col>
                            <Col xs={3}>
                                <Form.Control placeholder="Image" onChange={(e) => setBookContent({ ...bookContent, image: e.target.value })} />
                            </Col>

                        </Form.Group>
                        <Form.Group as={Row} className="mb-4 book-add-row" controlId="formHorizontalEmail">
                            <Col xs={1}>
                                <Form.Label>類型</Form.Label>
                            </Col>
                            <Col xs={3}>
                                <Form.Select defaultValue="book" onChange={(e) => setBookContent({ ...bookContent, type: e.target.value })}>
                                    <option value="book">書籍</option>
                                    <option value="paper">論文</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </Form>
                    <BookerFlyButton className="book-add-button" content="新增" onClick={() => handleSumbit(bookContent, handleShow)} />
                    <BookerFlyButton className="book-add-button" content="取消" onClick={() => navigate(-1)} />
                </div>
            </div>
            <ToastContainer autoClose={2000} />
        </React.Fragment>
    )
}

export default BookAdder;