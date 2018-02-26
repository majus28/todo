import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import './auth.css';
import Card from 'material-ui/Card';
import {connect} from 'react-redux';
import {UserActions} from '../../actions';

class Login extends Component {
constructor(props){
  super(props);
  this.state={
  username:'',
  password:''
}
  this.handleSubmit = this.handleSubmit.bind(this)
}


  handleSubmit(e){
    e.preventDefault();
    const {username, password} = this.state;
    const {dispatch} = this.props;
          if (username && password) {
              dispatch(UserActions.login(username, password));
          }
  }
render() {
    return (
          <div className='main'>
          <Card className='card'>
          <form name="form" onSubmit={this.handleSubmit}>
          <TextField
            hintText="Enter your email"
            floatingLabelText="Email"
            onChange = {(event,newValue) => this.setState({username:newValue})}
            />
          <br/>
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange = {(event,newValue) => this.setState({password:newValue})}
              />
            <br/>
              <button >Login</button>
            </form>
          </Card>
         </div>
    );
  }
}

const mapStateToProps = (state) => ({

});



export default connect(mapStateToProps)(Login);
