import types from "../actions/cardActions";
import {getCard} from "../selectors";

const emptyCard = (id, listId) => ({title: "New card", id: id, listId: listId, description: "", images: [], files: [], assigned: []});


export const addCard = (boardId, listId, id) => (dispatch, getState, {card}) => {
	const newCard = emptyCard(id, listId);
	card.addCard(boardId, newCard);

	dispatch({type: types.addCard, payload: {boardId, card: newCard}});
};

export const addCardBoard = (boardId, cards) => ({type: types.addCardBoard, payload: {boardId, cards}});

export const deleteCardBoard = boardId => ({type: types.deleteCardBoard, payload: {boardId}});

export const deleteCard = (boardId, id) => (dispatch, getState, {card}) => {
	card.deleteCard(boardId, id);

	dispatch({type: types.deleteCard, payload: {boardId, id}});
};

export const changeCard = (boardId, newCard) => (dispatch, getState, {card}) => {
	card.changeCard(boardId, newCard);

	dispatch({type: types.changeCard, payload: {boardId, id: newCard.id, newCard}});
};

export const deleteFile = (boardId, id, url) => (dispatch, getState, {card}) => {
	card.deleteFile(boardId, url);

	const cardData = getCard(boardId, id)(getState());
	dispatch(changeCard(boardId, {...cardData, files: cardData.files.filter(cur => cur.url !== url)}));
};

export const addFiles = (boardId, id, files, setUploading) => async (dispatch, getState, {card, file}) => {
	const [error, urls] = await file.uploadFiles(boardId, files.map(file => file.data));
	if (error) return;

	const cardFiles = files.map((file, i) => ({url: urls[i], filename: file.filename}));
	card.addFiles(boardId, id, cardFiles);
	setUploading(false);

	const cardData = getCard(boardId, id)(getState());
	dispatch(changeCard(boardId, {...cardData, files: [...cardData.files, ...cardFiles]}));
};

export const addImages = (boardId, id, images, setUploading) => async (dispatch, getState, {file}) => {
	const [error, ids] = await file.uploadFiles(boardId, images);
	if (error) return;
	setUploading(false);

	const cardData = getCard(boardId, id)(getState());
	dispatch(changeCard(boardId, {...cardData, images: [...cardData.images, ...ids]}));
};