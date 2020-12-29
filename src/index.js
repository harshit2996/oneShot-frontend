import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './tailwind.css';
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'

const Axios = axios.create({
  baseURL : process.env.REACT_APP_API_BASE_URL
})

export default Axios

ReactDOM.render(
    <App />,
  // <React.StrictMode>
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
