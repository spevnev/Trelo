export const getCards = axios => async id => {
	const res = await axios.get(`/card/${id}`).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const changeCard = axios => async (boardId, cardId, newCard) => {
	const res = await axios.put(`/card/`, {card: newCard, boardId, cardId}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};