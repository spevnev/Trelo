export const getBoard = axios => async id => {
	const res = await axios.get(`http://localhost:3000/api/board/${id}`).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const deleteBoard = axios => async id => {
	const res = await axios.delete(`http://localhost:3000/api/board/${id}`).catch(e => console.log(e));
	return res && res.status === 200;
};

export const changeBoard = axios => async (id, newBoard) => {
	const res = await axios.put(`http://localhost:3000/api/board/${id}`, {board: newBoard}).catch(e => console.log(e));
	return res && res.status === 200;
};

export const createBoard = axios => async board => {
	const res = await axios.post(`http://localhost:3000/api/board/`, {board}).catch(e => console.log(e));
	return res && res.status === 200;
};