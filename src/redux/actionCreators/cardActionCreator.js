import types from "../actions/cardActions";

export const addCardBoard = (boardId, cards) => ({type: types.addCardBoard, payload: {boardId, cards}});
export const addCard = (boardId, listId, id) => ({type: types.addCard, payload: {boardId, listId, id}});

export const deleteCard = (boardId, id) => ({type: types.deleteCard, payload: {boardId, id}});
export const deleteCardsInList = (boardId, listId) => ({type: types.deleteCardsInList, payload: {boardId, listId}});
export const deleteCardsInBoard = boardId => ({type: types.deleteCardsInBoard, payload: {boardId}});
export const deleteAssignedInCards = (boardId, username) => ({type: types.deleteAssignedInCards, payload: {boardId, username}});

export const changeCard = (boardId, id, newCard) => async (dispatch, getState, {card}) => {
	await card.changeCard(boardId, id, newCard);

	dispatch({type: types.changeCard, payload: {boardId, id, newCard}});
};