import actions from "../actions/userActions";
import {getUserBoards} from "../selectors";
import socket from "../../services/ws";
import {setUser} from "../actionCreators/userActionCreator";

export const ChangeBoards = newBoards => ({type: actions.changeBoards, payload: {newBoards}});

export const FetchUser = () => async (dispatch, getState, {userAPI}) => {
	const [error, data] = await userAPI.fetchData();
	if (error) {
		localStorage.removeItem("JWT");
		window.location.reload();
	}

	dispatch(setUser({boards: [], ...data}));
};

export const Login = (username, password, displayError) => async (dispatch, getState, {userAPI}) => {
	const [error, data] = await userAPI.login(username, password);
	if (error) return displayError(error);

	localStorage.setItem("JWT", data.token);

	dispatch(setUser(data.user));
};

export const Signup = (userData, displayError) => async (dispatch, getState, {userAPI}) => {
	const [error, data] = await userAPI.signup(userData.username, userData.password, userData.icon);
	if (error) return displayError(error);

	localStorage.setItem("JWT", data.token);

	dispatch(setUser(data.user));
};

export const Leave = boardId => (dispatch, getState, {userAPI}) => {
	const boards = getUserBoards()(getState());

	userAPI.leave(boardId, socket.id);

	dispatch(ChangeBoards(boards.filter(board => board.id !== boardId)));
};

export const ToggleFavourite = id => (dispatch, getState, {userAPI}) => {
	const boards = getUserBoards()(getState());
	const isFavourite = boards.filter(board => board.id === id)[0].isFavourite;

	userAPI.toggleFavourite(id, !isFavourite);

	dispatch(ChangeBoards(boards.map(board => board.id === id ? {...board, isFavourite: !isFavourite} : board)));
};