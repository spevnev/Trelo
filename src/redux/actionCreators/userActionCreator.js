import types from "../actions/userActions";
import {getUserBoards} from "../selectors";

export const fetchUser = () => async (dispatch, getState, {user}) => {
	const [error, data] = await user.fetchData();
	if (error) {
		localStorage.removeItem("JWT");
		window.location.reload();
	}

	dispatch({type: types.setUser, payload: {user: {boards: [], ...data}}});
};

export const login = (username, password, setError, success) => async (dispatch, getState, {user}) => {
	const [error, data] = await user.login(username, password);
	if (error) return setError(error);

	localStorage.setItem("JWT", data.token);

	dispatch({type: types.setUser, payload: {user: data.user}});
	success();
};

export const signup = (userData, setError, success) => async (dispatch, getState, {user}) => {
	const [error, data] = await user.signup(userData.username, userData.password, userData.icon);
	if (error) return setError(error);

	localStorage.setItem("JWT", data.token);

	dispatch({type: types.setUser, payload: {user: data.user}});
	success();
};

export const leave = boardId => async (dispatch, getState, {user}) => {
	const data = await user.leave(boardId);
	if (data === null) return;

	dispatch(changeBoards(getUserBoards()(getState()).filter(cur => cur.id !== boardId)));
};

export const toggleFavourite = id => async (dispatch, getState, {user}) => {
	const boards = getUserBoards()(getState());
	const board = boards.filter(cur => cur.id === id)[0];

	const data = await user.toggleFavourite(id, !board.isFavourite);
	if (data === null) return;

	dispatch(changeBoards(boards.map(cur => cur.id === id ? {...cur, isFavourite: !board.isFavourite} : cur)));
};

export const changeBoards = newBoards => ({type: types.changeBoards, payload: {newBoards}});