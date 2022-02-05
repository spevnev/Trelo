import types from "../actions/userActions";
import boardTypes from "../actions/boardActions";

export const fetchUser = () => async (dispatch, getState, {user}) => {
	const data = await user.fetchData();

	dispatch({type: types.setUser, payload: {user: data}});
};

export const addUser = (id, username, onSuccess) => async (dispatch, getState, {user}) => {
	const [error, data] = await user.addUser(username, id);
	if (error) return;

	onSuccess();
	const board = getState().board.filter(cur => cur.id === id)[0];
	dispatch({type: boardTypes.changeBoard, payload: {id, board: {...board, users: [...board.users, {...data, isOwner: false}]}}});
};

export const deleteUser = (id, username) => async (dispatch, getState, {user}) => {
	const [error, data] = await user.deleteUser(username, id);
	if (error) return;

	const board = getState().board.filter(cur => cur.id === id)[0];
	dispatch({type: boardTypes.changeBoard, payload: {id, board: {...board, users: board.users.filter(cur => cur.username !== username)}}});
};

export const login = (username, password, setError) => async (dispatch, getState, {user}) => {
	const [error, data] = await user.login(username, password);
	if (error) return setError("Invalid username or password!");

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

export const changeBoards = newBoards => async (dispatch, getState, {user}) => {
	const data = await user.changeBoards(newBoards);
	if (data === null) return;

	dispatch({type: types.changeBoards, payload: {newBoards}});
};