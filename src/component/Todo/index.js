import React, {Component} from 'react';
import TodoItems from "../list/list";
import "./TodoList.css";
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {TaskActions} from '../../actions';


class Todo extends Component {
    componentWillMount() {
        this.loadRemoteTodos();
    }

    loadRemoteTodos() {
        this.props.dispatch(TaskActions.index());
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
            menu: 'All'
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.validate = this.validate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.statusChange = this.statusChange.bind(this)
        this.menuChange = this.menuChange.bind(this)
    }

    deleteItem(key) {
        var filteredItems = this.props.items.filter(function (item) {
            return (item.key !== key);
        });
        this.props.dispatch(TaskActions.deleteTodo(key));
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

    addItem(e) {
        e.preventDefault();
        if (this.state.value !== "") {
            var data = {
                note: this.state.value,
                description: this.state.value,
                status:'Created'
            }
            this.props.dispatch(TaskActions.create(JSON.stringify(data)))
            this.props.dispatch(TaskActions.index())
            this.setState({
                value: ''
            })
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
                    error: true
                });
            }
        }

    }

    handleCancel() {
        this.setState({btnText: 'Add', editValue: '', is_edit: false})
    }

    async updateTodo(key) {
        var data = {
            note: this.state.editValue,
            description: this.state.editValue,
            status:'Completed'
        };
        this.props.dispatch(TaskActions.update(key, JSON.stringify(data)))
        this.handleCancel();
    }


    async statusChange(key) {
        var objIndex = this.props.items.findIndex((obj => obj.id === key));
        var status = this.props.items[objIndex].status;
        var todo = this.props.items[objIndex];
        var data = {
            note:todo.note,
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
        this.props.dispatch(TaskActions.update(key, JSON.stringify(data)));
    }

    menuChange(menuData) {
        this.setState({
            menu: menuData
        })
    }

    render() {
        return (
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
                    statusChange={this.statusChange}/>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.todos
    };
}


export default connect(mapStateToProps)(Todo);
