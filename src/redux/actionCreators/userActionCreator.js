import types from "../actions/userActions";

export const fetchUser = () => async (dispatch, getState, {user}) => {
	const data = await user.fetchData();

	dispatch({type: types.setUser, payload: {user: data}});
};

export const login = (username, password, setError) => async (dispatch, getState, {user}) => {
	const [success, data] = await user.login(username, password);
	if (!success) return setError("Invalid username or password!");

	localStorage.setItem("JWT", data.token);

	dispatch({type: types.setUser, payload: {user: data.user}});
	window.location.reload();
};

export const signup = (userData, setError) => async (dispatch, getState, {user}) => {
	const [success, data] = await user.signup(userData.username, userData.password, userData.icon);
	if (!success) return setError(data);

	localStorage.setItem("JWT", data.token);
	if (!data || !data.user) return;

	dispatch({type: types.setUser, payload: {user: data.user}});
	window.location.reload();
};