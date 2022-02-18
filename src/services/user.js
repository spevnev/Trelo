export const fetchData = axios => async () => {
	const res = await axios.get("/user/").catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const login = axios => async (username, password) => {
	const res = await axios.post("/auth/login", {username: username.toLowerCase(), password}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const signup = axios => async (username, password, icon) => {
	const res = await axios.post("/auth/signup", {username: username.toLowerCase(), password, icon}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const leave = axios => async boardId => {
	const res = await axios.post("/user/leave", {boardId}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const changeBoards = axios => async newBoards => {
	const res = await axios.put(`/user/`, {boards: newBoards}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const toggleFavourite = axios => async (boardId, fav) => {
	const res = await axios.put(`/user/favourite`, {boardId, fav}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};