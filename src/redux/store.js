import {applyMiddleware, compose, createStore} from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";
import bundle from "../services/index";

const store = createStore(reducer, (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(
	applyMiddleware(thunk.withExtraArgument(bundle)),
));

export default store;