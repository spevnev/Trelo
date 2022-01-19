import React from "react";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {useParams} from "react-router";

import {hasAccess, isAuth} from "./services/auth";

import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Board from "./pages/board";
import BoardSettings from "./pages/boardSettings";
import CardDescription from "./pages/cardDescription";
import Layout from "./layout";

const PrivateRoute = ({hasAccess, redirectTo}) => {
	const params = useParams();

	return hasAccess(params) ? <Outlet/> : <Navigate to={redirectTo}/>;
};

const App = () => {
	return (
		<Routes>
			<Route path="/login" element={isAuth() ? <Navigate to="/"/> : <Login/>}/>

			<Route path="/" element={<Layout><PrivateRoute hasAccess={isAuth} redirectTo="/login"/></Layout>}>
				<Route index element={<Dashboard/>}/>

				<Route path="board/:boardId" element={<PrivateRoute hasAccess={hasAccess} redirectTo="/"/>}>
					<Route index element={<Board/>}/>
					<Route path="settings" element={<BoardSettings/>}/>
					<Route path=":cardId" element={<CardDescription/>}/>
				</Route>
			</Route>

			<Route path="*" element={<Navigate to="/"/>}/>
		</Routes>);
};

export default App;
