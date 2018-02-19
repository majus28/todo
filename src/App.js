import React, { Component } from 'react';
import TodoItems from "./list/list";
import './App.css';
import "./TodoList.css";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  componentWillMount() {
    const { cookies } = this.props;
    if(cookies.get('Items')){
        this.setState({
          items: cookies.get('Items')
        })
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      error:false,
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.validate = this.validate.bind(this);
  }

  deleteItem(key) {
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });
    const { cookies } = this.props;
    this.setState({
      items: filteredItems
    });
    cookies.remove('Items')
    cookies.set('Items', JSON.stringify(filteredItems), { path: '/' });
  }
  addItem(e) {
    const { cookies } = this.props;
    e.preventDefault();
    var itemArray = this.state.items;
    if (this._inputElement.value !== "") {
      itemArray.unshift({
          text: this._inputElement.value,
          key: Date.now()
      });
      this.setState({
        items: itemArray
      });
      cookies.set('Items', JSON.stringify(this.state.items), { path: '/' });
      this._inputElement.value = "";
    }else{
      console.log(11);
      this.setState({
        error:true
      })
    }
  }  
  validate(e){
    if (e.target.value.trim() !== "") {
      this.setState({
        error:false
      });
    }else{
      this.setState({
        error:true
      });
    }
  }
  render() {
    return (
      <div className="todoListMain">
      <div className="header">
        <form onSubmit={this.addItem}>
        <input onChange={this.validate} ref={(a) => this._inputElement = a} 
                className={this.state.error ? 'error' : ''}
                placeholder="enter task">
        </input>
          <button type="submit">add</button>
        </form>
      </div>
      <TodoItems delete={this.deleteItem} entries={this.state.items}/>
    </div>
  
    );
  }
}

export default withCookies(App);
