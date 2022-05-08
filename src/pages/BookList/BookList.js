import React from 'react'
import { Button } from 'react-bootstrap';
import angryCat from '../../img/angry_cat.png'
import '../../App.css';
import Form from 'react-bootstrap/Form'
import { FaSearch } from 'react-icons/fa';
import InputGroup from 'react-bootstrap/InputGroup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllBookList from './AllBookList.js'
import SearchResultList from './SearchResultList.js'
import './BookList.css'
import { searchBookApi } from '../../api/bookerflyApi';

const searchBook = (setBookInfos, searchCondition, setSearchCondition) => {
  if (searchCondition.keyword === "") {
    toast.warn("查詢關鍵字不可為空", { hideProgressBar: true });
    return;
  }

  searchBookApi(searchCondition.option, searchCondition.keyword, response => {
    setBookInfos(response.data.results)
    setSearchCondition({ ...searchCondition, isSearched: true })
  }, error => console.error(error))
}

const BookList = ({ bookInfos, setBookInfos, searchCondition, setSearchCondition }) => {
  return (
    <React.Fragment>
      <div className="search-bar">
        <div className="search-option">
          <Form.Select defaultValue={searchCondition.option} onChange={(e) => setSearchCondition({ ...searchCondition, option: e.target.value })}>
            <option value="ANY_MATCH">關鍵字</option>
            <option value="TITLE">書名</option>
            <option value="AUTHOR">作者</option>
            <option value="TYPE">類型</option>
          </Form.Select>
        </div>
        <div className="keyword">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1"><FaSearch /></InputGroup.Text>
            <Form.Control onChange={(e) => setSearchCondition({ ...searchCondition, keyword: e.target.value })}
              defaultValue={searchCondition.keyword}
              placeholder="請輸入關鍵字"
            />
          </InputGroup>
        </div>
        <Button className="search-button" onClick={() => searchBook(setBookInfos, searchCondition, setSearchCondition)}>搜尋</Button>
      </div>
      {searchCondition.isSearched ? <SearchResultList bookInfos={bookInfos} /> : <AllBookList bookInfos={bookInfos} />}
      <ToastContainer autoClose={2000} />
    </React.Fragment>
  )
}

export default BookList;