import React, {Component} from 'react';
import TodoItems from "../list/list";
import "./TodoList.css";
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {TaskActions} from '../../actions';
import Loader from '../loader'
import Navigation from '../Navigation'

class Todo extends Component {
    componentWillMount() {
        this.loadRemoteTodos();
    }

    loadRemoteTodos() {
        var thisState = this;
        this.props.loadTasks().then(function () {
            thisState.setState({
                loading: false,
            })
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            error: false,
            is_edit: false,
            editValue: '',
            btnText: 'Add',
            editItem: [],
            value: '',
            disabled: false,
            menu: 0,
            loading: true
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.validate = this.validate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.statusChange = this.statusChange.bind(this);
        this.loadRemoteTodos = this.loadRemoteTodos.bind(this);
        this.menuChange = this.menuChange.bind(this);
    }


    addItem(e) {
        e.preventDefault();
        if (this.state.value !== "") {
            var $thisState = this;
            $thisState.loadingChange(true);
            var data = {
                note: this.state.value,
                description: this.state.value,
                status: 'Created'
            };
            this.props.createTask(JSON.stringify(data)).then(function () {
                $thisState.loadingChange(false);
            });
            this.setState({
                value: ''
            });
        } else {
            this.setState({
                error: true
            });
            this.handleCancel();
        }
    }


    validate(e) {
        if (!e.target) {
            this.setState({
                editValue: e
            });
            if (e.trim() === '') {
                this.setState({
                    disabled: true
                })
            } else {
                this.setState({
                    disabled: false
                })
            }
        } else {
            if (e.target.value.trim() !== "") {
                this.setState({
                    error: false,
                    value: e.target.value
                });
            } else {
                this.setState({
                    error: true,
                    value: e.target.value,
                });
            }
        }
    }

    deleteItem(key) {
        var $thisState = this;
        $thisState.loadingChange(true);
        var filteredItems = this.props.items.filter(function (item) {
            return (item.key !== key);
        });
        this.props.deleteTask(key).then(function () {
            $thisState.loadingChange(false);
        });
        this.setState({
            items: filteredItems
        });
    }

    updateItem(key) {
        var editItem = this.props.items.find(function (item) {
            return (item.id === key);
        });

        this.setState({editValue: editItem.note, editItem: editItem});
        this.setState({is_edit: true, btnText: 'Update'})
    }

    handleCancel() {
        this.setState({btnText: 'Add', editValue: '', is_edit: false})
    }

    async updateTodo(key) {
        var $thisState = this;
        $thisState.loadingChange(true);
        var data = {
            note: this.state.editValue,
            description: this.state.editValue,
        };
        this.props.updateTask(key, JSON.stringify(data)).then(function () {
            $thisState.loadingChange(false);
        });
        this.handleCancel();
    }

    loadingChange(boolean) {
        this.setState({
            loading: boolean
        })
    }

    async statusChange(key) {
        var $thisState = this;
        $thisState.loadingChange(true)
        var objIndex = this.props.items.findIndex((obj => obj.id === key));
        var status = this.props.items[objIndex].status;
        var todo = this.props.items[objIndex];
        var data = {
            note: todo.note,
            description: todo.description,
        };
        if (status === 'Created') {
            this.props.items[objIndex].status = 'Completed';
            data['status'] = 'Completed';
        }
        if (status === 'Completed') {
            this.props.items[objIndex].status = 'Created';
            data['status'] = 'Created';
        }
        this.props.updateTask(key, JSON.stringify(data)).then(function () {
            $thisState.loadingChange(false)
        });
    }

    menuChange(index) {
        this.setState({
            menu: index,
        })
    }

    renderScreen() {
        if (this.state.loading) {
            return (
                <Loader/>
            )
        } else {
            return (
                <div>
                    <div className="todoListMain container" id='app'>

                        <div className="header">
                            <TextField
                                hintText="Add todo"
                                fullWidth={true}
                                onChange={this.validate}
                                value={this.state.value}
                            />
                            <RaisedButton onClick={this.addItem} backgroundColor="rgb(53, 218, 51)">Add</RaisedButton>
                        </div>
                        <div>
                        </div>
                        <TodoItems
                            validate={this.validate}
                            cancel={this.handleCancel}
                            propsData={this.state}
                            delete={this.deleteItem}
                            update={this.updateItem}
                            entries={this.props.items}
                            updateTodo={this.updateTodo}
                            statusChange={this.statusChange}
                            menu={this.state.menu}/>

                    </div>
                    <div className='NavigateTap'>
                        <Navigation menuChange={this.menuChange} menu={this.state.menu}/>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderScreen()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.todos
    };
};


const mapDispatchToProps = (dispatch) => ({
    loadTasks() {
        return dispatch(TaskActions.index());
    },
    createTask(todo) {
        return dispatch(TaskActions.create(todo))
    },
    deleteTask(todo) {
        return dispatch(TaskActions.deleteTodo(todo))
    },
    updateTask(id, values) {
        return dispatch(TaskActions.update(id, values))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
