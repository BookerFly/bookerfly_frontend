import { get, put, post } from './common.js'

const bookerflyHost = "http://localhost:8080/bookerfly/";

export const getAllBookInformationApi = (callback, error_callback) => {
    let requestPath = bookerflyHost + "collection/book-infos";
    get(requestPath, callback, error_callback);
}

export const searchBookApi = (option, keyword, callback, error_callback) => {
    let requestPath = bookerflyHost + "search?searchOption=" + option + "&keyword=" + keyword;
    get(requestPath, callback, error_callback);
}

export const selectBookApi = (bookInfoId, callback, error_callback) => {
    let requestPath = bookerflyHost + "collection/select/book-infos/" + bookInfoId;
    get(requestPath, callback, error_callback);
}

export const getCheckoutRecordByUserIdApi = (userId, callback, error_callback) => {
    let requestPath = bookerflyHost + "record/check-out-record?userId=" + userId;
    get(requestPath, callback, error_callback);
}

export const getTrackingCheckoutRecordApi = (callback, error_callback) => {
    let requestPath = bookerflyHost + "record/check-out-record/manage";
    get(requestPath, callback, error_callback);
}

export const editBookStatusApi = (bookId, userId, bookStatus, callback, error_callback) => {
    let requestPath = bookerflyHost + "collection/books/" + bookId + "/edit/book-status";
    put(requestPath, {"userId":userId, "bookStatus":bookStatus}, callback, error_callback);
}

export const returnBookApi = (bookId, userId, callback, error_callback) => {
    let requestPath = bookerflyHost + "collection/books/" + bookId + "/return?userId=" + userId;
    put(requestPath, {}, callback, error_callback);
}

export const confirmReturnBookApi = (bookId, userId, callback, error_callback) => {
    let requestPath = bookerflyHost + "collection/books/" + bookId + "/confirm-return?userId=" + userId;
    put(requestPath, {}, callback, error_callback);
}

export const borrowBookApi = (bookTitle, bookId, callback, error_callback) => {
    let requestPath = bookerflyHost + "collection/books/" + bookId + "/borrow?userId=userId&bookTitle=" + bookTitle;
    post(requestPath, {}, callback, error_callback);
}

export const createBookApi = (bookContent, callback, error_callback) => {
    let requestPath = bookerflyHost + "collection/books/create";
    post(requestPath, bookContent, callback, error_callback);
}