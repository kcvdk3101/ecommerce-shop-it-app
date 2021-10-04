import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "rc-slider/assets/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import store from './store'

ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
