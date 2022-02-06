export const login = axios => async (username, password) => {
	const res = await axios.post("/user/login", {username: username.toLowerCase(), password}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const signup = axios => async (username, password, userIcon) => {
	const res = await axios.post("/user/signup", {username: username.toLowerCase(), password, userIcon}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const leave = axios => async boardId => {
	const res = await axios.post("/user/leave", {boardId}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const fetchData = axios => async () => {
	const res = await axios.get("/user/").catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const addUser = axios => async (username, boardId) => {
	const res = await axios.post(`/user/addBoard`, {username: username.toLowerCase(), boardId}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const deleteUser = axios => async (username, boardId) => {
	const res = await axios.post(`/user/deleteBoard`, {username: username.toLowerCase(), boardId}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const changeRole = axios => async (boardId, username, isOwner) => {
	const res = await axios.post(`/user/role`, {boardId, username, isOwner}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const changeBoards = axios => async newBoards => {
	const res = await axios.put(`/user/`, {boards: newBoards}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};