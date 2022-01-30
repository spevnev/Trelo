export const getBoard = axios => async id => {
	const res = await axios.get(`http://localhost:3000/api/board/${id}`).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const deleteBoard = axios => async id => {
	const res = await axios.delete(`http://localhost:3000/api/board/${id}`).catch(e => console.log(e));
	return res && res.status === 200;
};