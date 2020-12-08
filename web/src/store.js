import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
// import moduleName from 'redux';

// const getMiddleware = () => {
//   if (process.env.NODE_ENV === 'production') {
//     return applyMiddleware(thunk);
//   } else {
//     return applyMiddleware(thunk, createLogger());
//   }
// };

export const store = createStore(
  reducer,
  {},
  composeWithDevTools(applyMiddleware(thunk, createLogger()))
);
