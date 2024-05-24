import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import App from './spa/App';
import store from './spa/store';
import { init } from './spa/actions/user';
import { CableProvider } from './spa/context/cable';

store.dispatch(init());

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <CableProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </CableProvider>
  </React.StrictMode>
);
