export const login = axios => async (username, password) => {
	const res = await axios.post("/user/login", {username, password}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const signup = axios => async (username, password, userIcon) => {
	const res = await axios.post("/user/signup", {username, password, userIcon}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const fetchData = axios => async () => {
	const res = await axios.get("/user/").catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const addUser = axios => async (username, boardId) => {
	const res = await axios.post(`/user/`, {username, boardId}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const deleteUser = axios => async (username, boardId) => {
	const res = await axios.delete(`/user/`, {username, boardId}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const changeBoards = axios => async newBoards => {
	const res = await axios.put(`/user/`, {boards: newBoards}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};