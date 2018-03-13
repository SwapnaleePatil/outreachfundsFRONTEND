import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux'
import {applyMiddleware,createStore} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
// import App from './App';
import rootreducer from './reducer/index'
// import Login from './component/login'
// import HomePage from './component/homepage'
import registerServiceWorker from './registerServiceWorker';
import Main from "./component/index";
let store=createStore(rootreducer,composeWithDevTools(),applyMiddleware(thunk));
ReactDOM.render(<Provider store={store}><Main /></Provider>, document.getElementById('root'));
registerServiceWorker();
