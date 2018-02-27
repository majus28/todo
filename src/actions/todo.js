import {TaskConstants} from '../constants';
import {TaskService} from '../services';
import {history} from '../helpers';

export const TaskActions = {
    index,
    create,
    update,
    deleteTodo,
};

function index() {
    return dispatch => {
        return TaskService.index()
            .then(
                todos => {
                    dispatch(success(todos));
                    history.push('/todo');
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function success(todos) {
        return {type: TaskConstants.INDEX_SUCCESS, todos}
    }

    function failure(error) {
        return {type: TaskConstants.INDEX_FAILURE, error}
    }

}

function create(payload) {
    return dispatch => {
        return TaskService.create(payload)
            .then(
                todo => {
                    dispatch(createSuccess(todo));
                    history.push('/todo');
                },
                error => {
                    dispatch(createFailure(error));
                }
            );
    };

    function createSuccess(todo) {
        return {type: TaskConstants.CREATED_SUCCESS, todo}
    }

    function createFailure(error) {
        return {type: TaskConstants.CREATED_FAILURE, error}
    }
}


function update(todo, payload) {
    return dispatch => {
        return TaskService.update(todo, payload)
            .then(
                todo => {
                    dispatch(updateSuccess(todo));
                    history.push('/todo');
                },
                error => {
                    dispatch(updateFailure(error));
                }
            );
    };

    function updateSuccess(todo) {
        return {type: TaskConstants.UPDATED_SUCCESS, todo}
    }

    function updateFailure(error) {
        return {type: TaskConstants.UPDATED_FAILURE, error}
    }
}

function deleteTodo(todo) {
    return dispatch => {
        return TaskService.deleteTodo(todo)
            .then(
                todo => {
                    dispatch(deleteSuccess(todo));
                    history.push('/todo');
                },
                error => {
                    dispatch(deleteFailure(error));
                }
            );
    };

    function deleteSuccess(todo) {
        return {type: TaskConstants.DELETED_SUCCESS, todo}
    }

    function deleteFailure(error) {
        return {type: TaskConstants.DELETED_FAILURE, error}
    }
}
