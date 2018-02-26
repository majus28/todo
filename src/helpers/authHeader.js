export function authHeader() {
    // return authorization header with jwt token
    var accessToken = JSON.parse(localStorage.getItem('uid'));
    console.log(accessToken);
    if (accessToken) {
        return {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        };
    } else {
        return {};
    }
}
