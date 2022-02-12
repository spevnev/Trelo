import types from "../actions/cardActions";

const emptyCard = (id, listId) => ({title: "New card", id: id, listId: listId, description: "", images: [], files: [], assigned: []});


export const addCardBoard = (boardId, cards) => ({type: types.addCardBoard, payload: {boardId, cards}});
export const deleteCardBoard = boardId => ({type: types.deleteCardBoard, payload: {boardId}});


export const addCard = (boardId, listId, id) => async (dispatch, getState, {card}) => {
	const newCard = emptyCard(id, listId);
	await card.addCard(boardId, newCard);

	dispatch({type: types.addCard, payload: {boardId, card: newCard}});
};

export const deleteCard = (boardId, id) => async (dispatch, getState, {card}) => {
	await card.deleteCard(boardId, id);

	dispatch({type: types.deleteCard, payload: {boardId, id}});
};

export const deleteCardsInList = (boardId, listId) => (dispatch, getState, {}) => {
	getState().card.filter(cur => cur.id === boardId)[0].cards.forEach(cur => {
		if (cur.listId === listId) dispatch(deleteCard(boardId, cur.id));
	});
};

export const changeCard = (boardId, newCard) => async (dispatch, getState, {card}) => {
	await card.changeCard(boardId, newCard);

	dispatch({type: types.changeCard, payload: {boardId, id: newCard.id, newCard}});
};