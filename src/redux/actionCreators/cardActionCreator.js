import types from "../actions/cardActions";

export const addCardBoard = (boardId, cards) => ({type: types.addCardBoard, payload: {boardId, cards}});
export const addCard = (boardId, listId, id) => ({type: types.addCard, payload: {boardId, listId, id}});
export const deleteCard = (boardId, id) => ({type: types.deleteCard, payload: {boardId, id}});

export const deleteCardsInList = (boardId, listId) => (dispatch, getState, {}) => {
	getState().card.filter(cur => cur.id === boardId)[0].cards.forEach(cur => {
		if (cur.listId === listId) dispatch(deleteCard(boardId, cur.id));
	});
};

export const deleteCardBoard = boardId => ({type: types.deleteCardBoard, payload: {boardId}});

export const changeCard = (boardId, id, newCard) => async (dispatch, getState, {card}) => {
	await card.changeCard(boardId, id, newCard);

	dispatch({type: types.changeCard, payload: {boardId, id, newCard}});
};