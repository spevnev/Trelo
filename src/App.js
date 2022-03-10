import React, {useEffect} from "react";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {getToken} from "./services/jwt";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Board from "./pages/board";
import BoardSettings from "./pages/boardSettings";
import CardDescription from "./pages/cardDescription";
import Layout from "./layout";
import {useDispatch, useSelector} from "react-redux";
import {FetchUser} from "./redux/actionCreators/userActionCreator";
import {getUser} from "./redux/selectors";

const App = () => {
	const dispatch = useDispatch();
	const user = useSelector(getUser());


	useEffect(() => {
		if (getToken() && !user.boards) dispatch(FetchUser());
	}, [user]);


	return (
		<Routes>
			<Route path="/login" element={getToken() || user.username ? <Navigate to="/"/> : <Login/>}/>

			<Route path="/" element={<Layout>{getToken() || user.username ? <Outlet/> : <Navigate to="/login"/>}</Layout>}>
				<Route index element={<Dashboard/>}/>

				<Route path="board/:boardId">
					<Route index element={<Board/>}/>
					<Route path="settings" element={<BoardSettings/>}/>
					<Route path=":cardId" element={<CardDescription/>}/>
				</Route>
			</Route>

			<Route path="*" element={<Navigate to="/"/>}/>
		</Routes>
	);
};

export default App;
