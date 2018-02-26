import {API_URL, CLIENT_SECRET, GRAND_TYPE, CLIENT_ID } from '../config';
export const UserService = {
    login,
    logout,
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
        body: JSON.stringify({
            username : username,
            password : password,
            grant_type : GRAND_TYPE,
            client_id : CLIENT_ID,
            client_secret : CLIENT_SECRET,
        })
    };
    let AppUrl = API_URL+'/oauth/token';
    return fetch(AppUrl, requestOptions)
        .then(response => {
            if (!response && !response.access_token) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(response => {
            if (response && response.access_token) {
                localStorage.setItem('uid', response.access_token);
            }
            return response;
        });
}

function logout() {
    localStorage.removeItem('uid');
}
