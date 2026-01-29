import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {Provider} from "react-redux";
import GlobalStyles from "./styles";
import store from "./redux/store";

// Remove the loading when js loads
document.getElementById("loading").remove();

const root = createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<GlobalStyles/>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>,
);