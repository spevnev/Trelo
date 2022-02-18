export const getBoard = axios => async id => {
	const res = await axios.get(`/board/${id}`).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const createBoard = axios => async board => {
	const res = await axios.post("/board", {title: board.title, boardId: board.id}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const createList = axios => async (boardId, id, title) => {
	const res = await axios.post("/board/list", {boardId, id, title}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const changeTitle = axios => async (boardId, title) => {
	const res = await axios.put("/board", {boardId, title}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const changeList = axios => async (boardId, id, title) => {
	const res = await axios.put("/board/list", {boardId, id, title}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const deleteBoard = axios => async id => {
	const res = await axios.delete(`/board/${id}`).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const deleteList = axios => async (boardId, id) => {
	const res = await axios.delete(`/board/list/${boardId}/${id}`).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const addUser = axios => async (username, boardId) => {
	const res = await axios.post(`/board/user`, {username: username.toLowerCase(), boardId}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const deleteUser = axios => async (username, boardId) => {
	const res = await axios.delete(`/board/user/${boardId}/${username.toLowerCase()}`).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const changeRole = axios => async (boardId, username, isOwner) => {
	const res = await axios.put(`/board/user`, {boardId, username, isOwner}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};