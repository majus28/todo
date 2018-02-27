import React from 'react';
import {Router, Route} from 'react-router-dom';
import {history} from '../helpers';
import {PrivateRoute} from './PrivateRoute';
import Login from './Auth/index';
import Todo from './Todo/index';
import './App.css'
import Avatar from 'material-ui/Avatar';

class App extends React.Component {
    constructor(props) {
        super(props);
        history.listen((location, action) => {
        });
    }
    componentWillMount(){
        history.push('/todo');
    }
    render() {
        const {alert} = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className='logo'>
                        <Avatar  alt="Remy Sharp" src="https://is1-ssl.mzstatic.com/image/thumb/Purple111/v4/6e/fd/cb/6efdcbca-633e-e2f7-3b87-e76b859b7e1c/source/512x512bb.jpg" className='avatar' />
                        <span>
                            Todo
                        </span>
                        <span className='sub'>
                            s
                        </span>
                    </div>
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert && alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <Route path="/login" component={Login}/>
                                <PrivateRoute path="/todo" component={Todo}/>
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}


export default (App);
