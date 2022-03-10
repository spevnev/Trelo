import types from "../actions/cardActions";
import {getCard, getCards} from "../selectors";

const newEmptyCard = (id, listId, order) => ({title: "New card", id, listId, description: "", order, images: [], files: [], assigned: []});


export const AddCardBoard = (boardId, cards) => ({type: types.addCardBoard, payload: {boardId, cards}});

export const DeleteCardBoard = boardId => ({type: types.deleteCardBoard, payload: {boardId}});

export const AddCard = (boardId, listId, id, callback) => (dispatch, getState, {cardAPI}) => {
	let order = -1;
	getCards(boardId)(getState()).filter(card => card.listId === listId).forEach(card => order = Math.max(card.order, order));
	order++;

	const newCard = newEmptyCard(id, listId, order);

	dispatch({type: types.addCard, payload: {boardId, card: newCard}});
	callback();

	cardAPI.addCard(boardId, newCard);
};

export const DeleteCard = (boardId, id, callback) => (dispatch, getState, {cardAPI}) => {
	const curCard = getCard(boardId, id)(getState());
	const order = getCards(boardId)(getState()).filter(card => card.listId === curCard.listId && card.order > curCard.order).map(card => ({id: card.id, order: card.order - 1}));
	dispatch(ReorderCards(boardId, order));
	dispatch({type: types.deleteCard, payload: {boardId, id}});

	cardAPI.deleteCard(boardId, id);

	callback();
};

export const ChangeCard = (boardId, newCard) => (dispatch, getState, {cardAPI}) => {
	cardAPI.changeCard(boardId, newCard);

	dispatch({type: types.changeCard, payload: {boardId, id: newCard.id, newCard}});
};

export const ReorderCards = (boardId, order) => (dispatch, getState, {cardAPI}) => {
	cardAPI.reorderCards(boardId, order);

	dispatch({type: types.reorderCards, payload: {boardId, order}});
};

export const DeleteFile = (boardId, id, url) => (dispatch, getState, {cardAPI}) => {
	cardAPI.deleteFile(boardId, url);

	const cardData = getCard(boardId, id)(getState());
	dispatch(ChangeCard(boardId, {...cardData, files: cardData.files.filter(file => file.url !== url)}));
};

export const AddFiles = (boardId, id, files, onSuccess) => async (dispatch, getState, {cardAPI, fileAPI}) => {
	const [error, urls] = await fileAPI.uploadFiles(boardId, files.map(file => file.data));
	if (error) return;

	const cardFiles = files.map((file, i) => ({url: urls[i], filename: file.filename}));
	cardAPI.addFiles(boardId, id, cardFiles);

	onSuccess(cardFiles);
};