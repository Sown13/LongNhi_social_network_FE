import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store"
import { GoogleOAuthProvider } from "@react-oauth/google";
const YOUR_GOOGLE_CLIENT_ID = "537600243548-sn10qab7em2fqo0ohhn02846g07tvf6v.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    <Provider store={store}>
        <BrowserRouter scrollRestoration="manual">
            <GoogleOAuthProvider clientId={YOUR_GOOGLE_CLIENT_ID}>
                <App/>
            </GoogleOAuthProvider>


        </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
