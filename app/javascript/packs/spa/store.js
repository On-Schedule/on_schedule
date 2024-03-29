import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import api from './api';

export default createStore(
  rootReducer,
  compose(applyMiddleware(thunk.withExtraArgument(api)))
);
