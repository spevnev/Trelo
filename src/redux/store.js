import {applyMiddleware, createStore} from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";

const args = {};

const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument(args)));

export default store;