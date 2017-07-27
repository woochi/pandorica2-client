import {configure, authStateReducer, emailSignIn} from 'redux-auth';
import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  auth: authStateReducer
});

const store = compose(
  applyMiddleware(thunk)
)(createStore)(reducer);

export default store;
