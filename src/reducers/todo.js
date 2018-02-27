import {TaskConstants} from '../constants';

const initialState = {};

export function todos(state = initialState, action) {
    switch (action.type) {
        case TaskConstants.INDEX_REQUEST:
            return action.todos;
        case TaskConstants.INDEX_SUCCESS:
            return action.todos;
        case TaskConstants.INDEX_FAILURE:
            return {};
        case TaskConstants.CREATED_SUCCESS:
            return [
                ...state,
                action.todo
            ];
        case TaskConstants.UPDATED_SUCCESS:
            let todoIndex = state.findIndex(todo => todo.id === action.todo.id);
            state.splice(todoIndex, 1, action.todo);
            console.log(state, action);
            return state;
        case TaskConstants.DELETED_SUCCESS:
            let DeleteTodoIndex = state.findIndex(todo => todo.id === action.todo.id);
            state.splice(DeleteTodoIndex, 1);
            return state;
        default:
            return state
    }
}
