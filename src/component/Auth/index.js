import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import './auth.css';
import Card from 'material-ui/Card';
import {connect} from 'react-redux';
import {TaskActions, UserActions} from '../../actions';
import Loader from '../loader'
import {history} from "../../helpers";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading:true,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentWillMount(){
        this.setState({
            loading:false,
        })
    }

    handleSubmit(e) {
        this.setState({
            loading:true,
        })
        e.preventDefault();
        const {username, password} = this.state;
        if (username && password) {
            this.props.login(username, password).then(function () {
                history.push('/todo');
            });
        }
    }

    returnForm(){
        if(this.state.loading){
            return(
                <Loader />
            )
        }else{
            return(
                <div className='main'>
                    <Card className='card'>
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
                            <button>Login</button>
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
