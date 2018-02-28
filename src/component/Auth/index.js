import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import './auth.css';
import Card from 'material-ui/Card';
import {connect} from 'react-redux';
import {UserActions} from '../../actions';
import Loader from '../loader'
import {history} from "../../helpers";
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: true,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount() {
        this.setState({
            loading: false,
        })
    }

    handleSubmit(e) {
        this.setState({
            loading: true,
        })
        e.preventDefault();
        const {username, password} = this.state;
        if (username && password) {
            this.props.login(username, password).then(function () {
                setTimeout(function () {
                    history.push('/todo');
                }, 1000);
            });
        }
    }

    returnForm() {
        if (this.state.loading) {
            return (
                <Loader/>
            )
        } else {
            return (
                <div className='main container'>
                    <Card className='card'>
                        <div className='card-title'><span>Login</span></div>
                        <form name="form" onSubmit={this.handleSubmit}>
                            <TextField
                                hintText="Enter your email"
                                floatingLabelText="Email"
                                onChange={(event, newValue) => this.setState({username: newValue})}
                            />
                            <br/>
                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange={(event, newValue) => this.setState({password: newValue})}
                            />
                            <br/>
                            <RaisedButton onClick={this.handleSubmit} backgroundColor='blue'
                                          className='loginBtn'>Login</RaisedButton>
                        </form>
                    </Card>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.returnForm()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    login(username, password) {
        return dispatch(UserActions.login(username, password));
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
