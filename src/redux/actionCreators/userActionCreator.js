import types from "../actions/userActions";
import {changeBoard} from "./boardActionCreator";

export const fetchUser = () => async (dispatch, getState, {user}) => {
	const [error, data] = await user.fetchData();
	if (error) {
		localStorage.removeItem("JWT");
		window.location.reload();
	}

	dispatch({type: types.setUser, payload: {user: data}});
};

export const login = (username, password, setError) => async (dispatch, getState, {user}) => {
	const [error, data] = await user.login(username, password);
	if (error) return setError(error);

	localStorage.setItem("JWT", data.token);

	dispatch({type: types.setUser, payload: {user: data.user}});
	window.location.reload();
};

export const signup = (userData, setError) => async (dispatch, getState, {user}) => {
	const [error, data] = await user.signup(userData.username, userData.password, userData.icon);
	if (error) return setError(error);

	localStorage.setItem("JWT", data.token);
	if (!data || !data.user) return;

	dispatch({type: types.setUser, payload: {user: data.user}});
	window.location.reload();
};

export const leave = boardId => async (dispatch, getState, {user}) => {
	const data = await user.leave(boardId);
	if (data === null) return;

	dispatch(changeBoards(getState().user.boards.filter(cur => cur.id !== boardId)));
};

export const changeBoards = newBoards => async (dispatch, getState, {user}) => {
	if (newBoards.filter(cur => cur.title.length === 0).length === 0) {
		const data = await user.changeBoards(newBoards);
		if (data === null) return;
	}

	dispatch({type: types.changeBoards, payload: {newBoards}});
};

export const addUser = (id, username, onSuccess, onError) => async (dispatch, getState, {user}) => {
	const [error, data] = await user.addUser(username, id);
	if (error) return onError(error);

	onSuccess(data);
	const board = getState().board.filter(cur => cur.id === id)[0];
	dispatch(changeBoard(id, {...board, users: [...board.users, {...data, isOwner: false}]}));
};

export const deleteUser = (id, username) => async (dispatch, getState, {user}) => {
	const [error] = await user.deleteUser(username, id);
	if (error) return;

	const board = getState().board.filter(cur => cur.id === id)[0];
	dispatch(changeBoard(id, {...board, users: board.users.filter(cur => cur.username !== username)}));
};

export const changeRole = (id, username, isOwner) => async (dispatch, getState, {user}) => {
	const data = await user.changeRole(id, username, isOwner);
	if (data === null) return;

	const board = getState().board.filter(cur => cur.id === id)[0];
	dispatch(changeBoard(id, {...board, users: board.users.map(cur => cur.username === username ? {...cur, isOwner} : cur)}));
};