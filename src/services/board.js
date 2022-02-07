export const getBoard = axios => async id => {
	const res = await axios.get(`/board/${id}`).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const deleteBoard = axios => async id => {
	const res = await axios.delete(`/board/${id}`).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const changeBoard = axios => async (boardId, board) => {
	const res = await axios.put("/board/", {board, boardId}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const createBoard = axios => async board => {
	const res = await axios.post("/board", {board}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};