// src/redux/store.js
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { productReducer } from "./reducers/productReducer";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";

const rootReducer = combineReducers({
  productState: productReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
