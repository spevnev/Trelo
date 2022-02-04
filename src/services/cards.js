export const getCards = axios => async id => {
	const res = await axios.get(`http://localhost:3000/api/cards/${id}`).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const changeCard = axios => async (boardId, id, newCard) => {
	const res = await axios.put(`http://localhost:3000/api/cards/${boardId}/${id}`, {card: newCard}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};