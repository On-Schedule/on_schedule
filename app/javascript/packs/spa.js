import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
// import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
// import mixpanel from 'mixpanel-browser';

import App from './spa/App';
// import ErrorPage from './spa/components/ErrorPage';
import store from './spa/store';
import { init } from './spa/actions/user';

store.dispatch(init());

// mixpanel.init(process.env.MIXPANEL_KEY || "Disable", {ignore_dnt: true});
// if (!process.env.MIXPANEL_KEY) mixpanel.disable();

// const rollbarConfig = {
//   enabled: !!process.env.ROLLBAR_CLIENT_TOKEN,
//   accessToken: process.env.ROLLBAR_CLIENT_TOKEN,
//   environment: 'production',
// };

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);