import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import {Provider} from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {store} from './helpers'


ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <App/>
        </MuiThemeProvider>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
