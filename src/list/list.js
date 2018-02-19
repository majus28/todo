import React, { Component } from "react";
import FlipMove from 'react-flip-move';
import ReactTooltip from 'react-tooltip'

class TodoItems extends Component {
  constructor(props, context) {
    super(props, context);
    this.createTasks = this.createTasks.bind(this);
  }
  delete(key) {
    this.props.delete(key);

  }
  createTasks(item) {
    return <li onClick={() => this.delete(item.key)} data-tip data-for='delete' key={item.key}>{item.text}</li>
  }
 
  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);
 
    return (
      <ul className="theList">
       <FlipMove duration={250} easing="ease-out">
          {listItems}
          <ReactTooltip id='delete' type='error'>
            <span>Click TO Delete</span>
        </ReactTooltip>
        </FlipMove>
      </ul>
    );
  }
};
 
export default TodoItems;