import types from "../actions/userActions";

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

export const toggleFavourite = board => async (dispatch, getState, {user}) => {
	const data = await user.toggleFavourite(board.id, !board.isFavourite);
	if (data === null) return;

	dispatch(changeBoards(getState().user.boards.map(cur => cur.id === board.id ? {...cur, isFavourite: !board.isFavourite} : cur)));
};

export const changeBoards = newBoards => ({type: types.changeBoards, payload: {newBoards}});