import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Routes from './routes';
import './styles/litera.min.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('root'),
);
