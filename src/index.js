import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {Provider} from "react-redux";
import GlobalStyles from "./styles";
import store from "./redux/store";

document.getElementById("loading").remove();

ReactDOM.render(
	<Provider store={store}>
		<GlobalStyles/>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root"),
);