import React, { Component } from 'react';
import "./menu.css";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.menuChange = this.menuChange.bind(this)
  }
  menuChange(menu){
    this.props.menuChange(menu);
  }
  render() {
    return (
      <div id="sse1">
        <div id="sses1">
          <ul>
            <li className={this.props.active === 'All' ? 'active' : ''} onClick={() => this.menuChange('All')}><span >All</span></li>
            <li className={this.props.active === 'Created' ? 'active' : ''} onClick={() => this.menuChange('Created')}><span >Created</span></li>
            <li className={this.props.active === 'Completed' ? 'active' : ''} onClick={() => this.menuChange('Completed')}><span >Completed</span></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Menu;
