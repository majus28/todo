import {UserConstants} from '../constants';

let user = {
    token: localStorage.getItem('uid'),
    auth: {}
};
const initialState = user;

export function authentication(state = initialState, action) {
    switch (action.type) {
        case UserConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case UserConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case UserConstants.LOGIN_FAILURE:
            return {};
        case UserConstants.LOGOUT:
            return {};
        default:
            return state
    }
}
