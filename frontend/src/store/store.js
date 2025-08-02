// store/store.js
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import auth from './accountReducer';

// Combine reducers (if you have more reducers in the future)
const rootReducer = combineReducers({
  auth: auth
});

// Create store
const store = createStore(
  rootReducer,
  // For Redux DevTools extension support
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
