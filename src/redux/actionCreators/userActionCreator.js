import types from "../actions/userActions";

export const fetchUser = () => async (dispatch, getState, {user}) => {
	const data = await user.fetchData();

	dispatch({type: types.setUser, payload: {user: data}});
};

export const login = (username, password, navigate) => async (dispatch, getState, {user}) => {
	const data = await user.login(username, password);
	localStorage.setItem("JWT", data.token);

	dispatch({type: types.setUser, payload: {user: data.user}});
	navigate("/");
};

export const signup = (username, password, navigate, setError) => async (dispatch, getState, {user}) => {
	const [success, data] = await user.signup(username, password);
	if (!success) return setError(data);

	localStorage.setItem("JWT", data.token);
	if (!data || !data.user) return;
	dispatch({type: types.setUser, payload: {user: data.user}});
	navigate("/");
};