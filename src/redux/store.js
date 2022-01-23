import {applyMiddleware, compose, createStore} from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";

const store = createStore(reducer, (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(
	applyMiddleware(thunk),
));

export default store;