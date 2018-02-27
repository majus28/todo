import React, { Component } from "react";
import FlipMove from 'react-flip-move';
import { Flex, Box } from 'reflexbox';
import RaisedButton from 'material-ui/RaisedButton';

class TodoItems extends Component {
  constructor(props, context) {
    super(props, context);

    this.createTasks = this.createTasks.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.statusChange = this.statusChange.bind(this);
  }
  delete(key) {
    this.props.delete(key);

  }

  update(key) {
    this.props.update(key);
  }
cancel(){
  this.props.cancel();
}

inputChange(e){
  this.props.validate(e.target.value)
}

updateTodo(key){
  this.props.updateTodo(key);
}

statusChange(key){
  this.props.statusChange(key);
}

  createTasks(item) {
    if(this.props.propsData.is_edit && this.props.propsData.editItem.id === item.id){
      return(
        <div key={item.id}>
          <Flex p={2} align='center'>
            <Box px={2} style={{width:'100%'}}>
            <input onChange={this.inputChange} ref={(a) => this._inputElement = a}
              className={this.props.propsData.error ? 'error' : ''}
              placeholder="enter task"
              value={this.props.propsData.editValue}
              >
            </input>
            </Box>
            <Box px={1} w={2/2}>
            <RaisedButton className='right gap' backgroundColor="rgb(0, 0, 0)" onClick={() => this.cancel()}>Cancel</RaisedButton>
            <RaisedButton className='right gap' backgroundColor="rgb(0, 104, 212)" disabled={this.props.propsData.disabled} onClick={() => this.updateTodo(item.id)}>{this.props.propsData.btnText}</RaisedButton>
            </Box>
        </Flex>
        </div>
      )
    }else{
      return(
        <div key={item.id}>
        <Flex p={2} align='center'>
            <Box px={2} w={1/2} className={'text ' + (item.status ? item.status.toLowerCase() : 'created')} onClick={() => this.statusChange(item.id)}>
            <span  data-tip data-for='delete' key={item.id}>{item.note}</span>
            </Box>
            <Box px={1} w={2/2}>
            <RaisedButton className="right gap" backgroundColor="rgb(189, 7, 7)" onClick={() => this.delete(item.id)}>Delete</RaisedButton>
            <RaisedButton className='right gap' backgroundColor="rgb(0, 104, 212)" onClick={() => this.update(item.id)}>Edit</RaisedButton>
            </Box>
        </Flex>
        </div>
      )
    }
  }

  render() {
    var todoEntries = this.props.entries;
    if(typeof(todoEntries) === 'object' && !this.props.entries.length){
      todoEntries = [];
    }
    var listItems = todoEntries.map(item => this.createTasks(item));
    if(listItems.length){
      return (
        <div className="theList">
         <FlipMove duration={250} easing="ease-out">
            {listItems}
          </FlipMove>
        </div>
      );
    }else{
      return (
        <div className="theList">
           <span className='noTask'>No Tasks Here</span>
        </div>
      );
    }
  }
};

export default TodoItems;
