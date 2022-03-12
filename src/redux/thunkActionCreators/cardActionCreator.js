import {getCard, getCards} from "../selectors";
import socket from "../../services/ws";
import {addCard, changeCard, deleteCard, reorderCards} from "../actionCreators/cardActionCreator";

const newEmptyCard = (id, listId, order) => ({title: "New card", id, listId, description: "", order, images: [], files: [], assigned: []});


export const AddCard = (boardId, listId, id, callback) => (dispatch, getState, {cardAPI}) => {
	let order = -1;
	getCards(boardId)(getState()).filter(card => card.listId === listId).forEach(card => order = Math.max(card.order, order));
	order++;

	const newCard = newEmptyCard(id, listId, order);

	dispatch(addCard(boardId, newCard));
	callback();

	cardAPI.addCard(boardId, newCard, socket.id);
};

export const DeleteCard = (boardId, id, callback) => (dispatch, getState, {cardAPI}) => {
	const curCard = getCard(boardId, id)(getState());
	const order = getCards(boardId)(getState()).filter(card => card.listId === curCard.listId && card.order > curCard.order).map(card => ({id: card.id, order: card.order - 1}));

	dispatch(ReorderCards(boardId, order));
	dispatch(deleteCard(boardId, id));

	cardAPI.deleteCard(boardId, id);

	callback();
};

export const ChangeCard = (boardId, newCard) => (dispatch, getState, {cardAPI}) => {
	if (!newCard) return;
	cardAPI.changeCard(boardId, newCard, socket.id);

	dispatch(changeCard(boardId, newCard));
};

export const ReorderCards = (boardId, order) => (dispatch, getState, {cardAPI}) => {
	cardAPI.reorderCards(boardId, order, socket.id);

	dispatch(reorderCards(boardId, order));
};

export const DeleteFile = (boardId, id, url) => (dispatch, getState, {cardAPI}) => {
	cardAPI.deleteFile(boardId, url);

	const cardData = getCard(boardId, id)(getState());
	dispatch(ChangeCard(boardId, {...cardData, files: cardData.files.filter(file => file.url !== url)}));
};

export const AddFiles = (boardId, id, files, onSuccess) => async (dispatch, getState, {cardAPI, fileAPI}) => {
	const [error, urls] = await fileAPI.uploadFiles(boardId, files.map(file => file.data), socket.id);
	if (error) return;

	const cardFiles = files.map((file, i) => ({url: urls[i], filename: file.filename}));
	cardAPI.addFiles(boardId, id, cardFiles, socket.id);

	onSuccess(cardFiles);
};