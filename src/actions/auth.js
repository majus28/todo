import { UserConstants } from '../constants';
import { UserService } from '../services';
import { history } from '../helpers';

export const UserActions = {
    login,
    logout,
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        UserService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/todo');
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: UserConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: UserConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: UserConstants.LOGIN_FAILURE, error } }
}

function logout() {
    UserService.logout();
    return { type: UserConstants.LOGOUT };
}
