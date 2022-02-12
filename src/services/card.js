export const getCards = axios => async id => {
	const res = await axios.get(`/card/${id}`).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const changeCard = axios => async (boardId, newCard) => {
	const res = await axios.put(`/card/`, {card: newCard, boardId}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const addCard = axios => async (boardId, card) => {
	const res = await axios.post(`/card/`, {card, boardId}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const deleteCard = axios => async (boardId, id) => {
	const res = await axios.delete(`/card/${boardId}/${id}`).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};