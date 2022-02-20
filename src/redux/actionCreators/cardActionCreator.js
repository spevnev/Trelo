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
	card.changeCard(boardId, newCard);

	dispatch({type: types.changeCard, payload: {boardId, id: newCard.id, newCard}});
};

export const addFiles = (boardId, cardData, files) => async (dispatch, getState, {card, file}) => {
	const [error, ids] = await file.uploadFiles(boardId, files.map(file => file.data));
	if (error) return;
	const cardFiles = files.map((file, i) => ({id: ids[i], filename: file.filename}));

	await card.addFiles(boardId, cardData.id, cardFiles);
	dispatch({type: types.changeCard, payload: {boardId, id: cardData.id, newCard: {...cardData, files: [...cardData.files, ...cardFiles]}}});
};

export const deleteFile = (boardId, cardData, id) => async (dispatch, getState, {card}) => {
	await card.deleteFile(boardId, id);

	dispatch(changeCard(boardId, {...cardData, files: cardData.files.filter(cur => cur.id !== id)}));
};

export const addImages = (boardId, card, images) => async (dispatch, getState, {file}) => {
	const [error, ids] = await file.uploadImages(boardId, images);
	if (error) return;

	dispatch(changeCard(boardId, {...card, images: [...card.images, ...ids]}));
};