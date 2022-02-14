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

export const addFile = (boardId, card, filename, data) => async (dispatch, getState, {file}) => {
	const [error, id] = await file.uploadFile(boardId, data);
	if (error) return;

	dispatch(changeCard(boardId, {...card, files: [...card.files, {filename, id}]}));
};

export const addImage = (boardId, card, data, ext) => async (dispatch, getState, {file}) => {
	const [error, id] = await file.uploadImage(boardId, data, ext);
	if (error) return;

	dispatch(changeCard(boardId, {...card, images: [...card.images, {id, ext}]}));
};