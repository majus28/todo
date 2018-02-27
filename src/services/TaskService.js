import {API_URL} from '../config';

export const TaskService = {
    index,
    create,
    update,
    deleteTodo
};
var accessToken = localStorage.getItem('auth_token');

function index() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
    };
    let AppUrl = API_URL + 'api/tasks';
    return fetch(AppUrl, requestOptions).then((response) => response.json())
        .then((responseJson) => {
            return Promise.resolve(responseJson);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}

function create(payload) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: payload,
    };
    let AppUrl = API_URL + 'api/tasks';
    return fetch(AppUrl, requestOptions).then((response) => response.json())
        .then((responseJson) => {
            return Promise.resolve(responseJson);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}


function update(todo, payload) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: payload,
    };
    let AppUrl = API_URL + 'api/tasks/' + todo;
    return fetch(AppUrl, requestOptions).then((response) => response.json())
        .then((responseJson) => {
            return Promise.resolve(responseJson);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}


function deleteTodo(todo) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
    };
    let AppUrl = API_URL + 'api/tasks/' + todo;
    return fetch(AppUrl, requestOptions).then((response) => response.json())
        .then((responseJson) => {
            return Promise.resolve(responseJson);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}