import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store  from './redux/store'
import { Provider } from 'react-redux'
import { positions, transitions, Provider as Alertprovider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
const options = {
  timeout: 2000,
  offset: '25px',
  positions: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE,
};
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Alertprovider template={AlertTemplate} {...options}>

      <Provider store={store}>
      <App />
  
  </Provider>
  </Alertprovider>

);
