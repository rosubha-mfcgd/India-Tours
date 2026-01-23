
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles//index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById('root'));
const CLIENT_ID= process.env.REACT_APP_CLIENT_ID;
root.render(                      
  <React.StrictMode>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta httpEquiv="Content-Security-Policy" content="script-src 'unsafe-inline' 'unsafe-eval'   
   http://localhost:8081 https://apis.google.com https://www.gstatic.com https://accounts.google.com/gsi/client https://js.stripe.com;"/>

    <BrowserRouter>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <App />
    </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
