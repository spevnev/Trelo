import types from "../actions/userActions";
import {getUserBoards} from "../selectors";

export const changeBoards = newBoards => ({type: types.changeBoards, payload: {newBoards}});

export const fetchUser = () => async (dispatch, getState, {userAPI}) => {
	const [error, data] = await userAPI.fetchData();
	if (error) {
		localStorage.removeItem("JWT");
		window.location.reload();
	}

	dispatch({type: types.setUser, payload: {user: {boards: [], ...data}}});
};

export const login = (username, password, displayError, success) => async (dispatch, getState, {userAPI}) => {
	const [error, data] = await userAPI.login(username, password);
	if (error) return displayError(error);

	localStorage.setItem("JWT", data.token);

	dispatch({type: types.setUser, payload: {user: data.user}});
	success();
};

export const signup = (userData, displayError) => async (dispatch, getState, {userAPI}) => {
	const [error, data] = await userAPI.signup(userData.username, userData.password, userData.icon);
	if (error) return displayError(error);

	localStorage.setItem("JWT", data.token);

	dispatch({type: types.setUser, payload: {user: data.user}});
};

export const leave = boardId => (dispatch, getState, {userAPI}) => {
	userAPI.leave(boardId);

	dispatch(changeBoards(getUserBoards()(getState()).filter(cur => cur.id !== boardId)));
};

export const toggleFavourite = id => (dispatch, getState, {userAPI}) => {
	const boards = getUserBoards()(getState());
	const isFavourite = boards.filter(cur => cur.id === id)[0].isFavourite;

	userAPI.toggleFavourite(id, !isFavourite);

	dispatch(changeBoards(boards.map(cur => cur.id === id ? {...cur, isFavourite: !isFavourite} : cur)));
};