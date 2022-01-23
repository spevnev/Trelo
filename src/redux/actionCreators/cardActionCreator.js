import types from "../actions/cardActions";

export const addCardBoard = boardId => ({
	type: types.addCardBoard,
	payload: {boardId},
});

export const addCard = (boardId, listId, cardId) => ({
	type: types.addCard,
	payload: {boardId, listId, id: cardId},
});

export const changeCard = (boardId, cardId, changes) => ({
	type: types.changeCard,
	payload: {boardId, id: cardId, changes},
});

export const deleteCardsInList = (boardId, listId) => ({
	type: types.deleteCardsInList,
	payload: {boardId, listId},
});