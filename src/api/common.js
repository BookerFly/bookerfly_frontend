import axios from 'axios';

export const get = (requestPath, callback, error_callback) => {
    axios.get(requestPath).then((response) => {
        if(callback) {
            callback(response);
        }
    }).catch((error) => {
        console.log(error);
        if(error_callback) {
            error_callback(error)
        }
    });
}

export const post = (requestPath, payload, callback, error_callback) => {
    axios.post(requestPath, payload).then((response) => {
        if(callback) {
            callback(response);
        }
    }).catch((error) => {
        console.log(error);
        if(error_callback) {
            error_callback(error)
        }
    });
}

export const put = (requestPath, payload, callback, error_callback) => {
    axios.put(requestPath, payload).then((response) => {
        if(callback) {
            callback(response);
        }
    }).catch((error) => {
        console.log(error);
        if(error_callback) {
            error_callback(error)
        }
    });
}
