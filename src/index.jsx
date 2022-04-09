import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import App from './App';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename='/f1-stats'>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);