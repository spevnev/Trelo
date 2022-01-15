import React from "react";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";

import {isAuth} from "./services/auth";
import Layout from "./layout";

const App = () => {
	return (
		<Layout>
			<Routes>
				<Route path="/login" element={isAuth() ? <Navigate to="/"/> : <h1>Sign up</h1>}/>

				<Route path="/" element={isAuth() ? <Outlet/> : <Navigate to="/login"/>}>
					<Route index element={<h1>Default</h1>}/>
				</Route>

				<Route path="/404" element={<h1>Error 404 - Page not found</h1>}/>
				<Route path="*" element={<Navigate to="/404"/>}/>
			</Routes>
		</Layout>
	);
};

export default App;
