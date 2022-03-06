import types from "../actions/cardActions";
import {getCard, getCards} from "../selectors";

const emptyCard = (id, listId, order) => ({title: "New card", id, listId, description: "", order, images: [], files: [], assigned: []});


export const addCard = (boardId, listId, id, onSuccess) => (dispatch, getState, {card}) => {
	let order = -1;
	getCards(boardId)(getState()).filter(cur => cur.listId === listId).forEach(cur => order = Math.max(cur.order, order));
	order++;
	const newCard = emptyCard(id, listId, order);

	dispatch({type: types.addCard, payload: {boardId, card: newCard}});
	onSuccess();

	card.addCard(boardId, newCard);
};

export const addCardBoard = (boardId, cards) => ({type: types.addCardBoard, payload: {boardId, cards}});

export const deleteCardBoard = boardId => ({type: types.deleteCardBoard, payload: {boardId}});

export const deleteCard = (boardId, id, onSuccess) => (dispatch, getState, {card}) => {
	const curCard = getCard(boardId, id)(getState());
	const order = getCards(boardId)(getState()).filter(cur => cur.listId === curCard.listId && cur.order > curCard.order).map(cur => ({id: cur.id, order: cur.order - 1}));
	dispatch(reorderCards(boardId, order));
	dispatch({type: types.deleteCard, payload: {boardId, id}});

	card.deleteCard(boardId, id);

	onSuccess();
};

export const changeCard = (boardId, newCard) => (dispatch, getState, {card}) => {
	card.changeCard(boardId, newCard);

	dispatch({type: types.changeCard, payload: {boardId, id: newCard.id, newCard}});
};

export const reorderCards = (boardId, order) => (dispatch, getState, {card}) => {
	card.reorderCards(boardId, order);

	dispatch({type: types.reorderCards, payload: {boardId, order}});
};

export const deleteFile = (boardId, id, url) => (dispatch, getState, {card}) => {
	card.deleteFile(boardId, url);

	const cardData = getCard(boardId, id)(getState());
	dispatch(changeCard(boardId, {...cardData, files: cardData.files.filter(cur => cur.url !== url)}));
};

export const addFiles = (boardId, id, files, onSuccess) => async (dispatch, getState, {card, file}) => {
	const [error, urls] = await file.uploadFiles(boardId, files.map(file => file.data));
	if (error) return;

	const cardFiles = files.map((file, i) => ({url: urls[i], filename: file.filename}));
	card.addFiles(boardId, id, cardFiles);

	onSuccess(cardFiles);
};