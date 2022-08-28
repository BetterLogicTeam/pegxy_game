import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from "react-moralis";
import { Provider } from 'react-redux';

import store from './redux/redux/index'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MoralisProvider initializeOnMount={true}
         serverUrl="https://r4fmqqmqaork.usemoralis.com:2053/server" appId="YOn5nqKT9haTXILW9F1TJ0Xrm6uqWIndeHHxsxf4"
         masterKey="CMnEqAAmvs3R2Sy01AI6dba7sC7PTpJHQlid31YA"
          >

            <Provider store={store}>  
              <App />
              </Provider>



    </MoralisProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
