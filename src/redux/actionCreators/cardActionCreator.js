import types from "../actions/cardActions";

export const addCardBoard = (boardId, cards) => ({
	type: types.addCardBoard,
	payload: {boardId, cards},
});

export const deleteCardsInList = (boardId, listId) => ({
	type: types.deleteCardsInList,
	payload: {boardId, listId},
});

export const deleteCardsInBoard = boardId => ({
	type: types.deleteCardsInBoard,
	payload: {boardId},
});

export const deleteAssignedInCards = (boardId, username) => ({
	type: types.deleteAssignedInCards,
	payload: {boardId, username},
});


export const addCard = (boardId, listId, cardId) => ({
	type: types.addCard,
	payload: {boardId, listId, id: cardId},
});

export const deleteCard = (boardId, id) => ({
	type: types.deleteCard,
	payload: {boardId, id},
});

export const reorderCard = (boardId, id, listId) => ({
	type: types.reorderCard,
	payload: {boardId, id, listId},
});


export const changeCardTitle = (boardId, id, title) => ({
	type: types.changeTitle,
	payload: {boardId, id, title},
});


export const changeCardDescription = (boardId, id, description) => ({
	type: types.changeDescription,
	payload: {boardId, id, description},
});


export const addCardImage = (boardId, id, src) => ({
	type: types.addImage,
	payload: {boardId, id, src},
});

export const deleteCardImage = (boardId, id, src) => ({
	type: types.deleteImage,
	payload: {boardId, id, src},
});


export const addCardFile = (boardId, id, file) => ({
	type: types.addFile,
	payload: {boardId, id, file},
});

export const deleteCardFile = (boardId, id, filename) => ({
	type: types.deleteFile,
	payload: {boardId, id, filename},
});

export const renameCardFile = (boardId, id, filename, newFilename) => ({
	type: types.renameFile,
	payload: {boardId, id, filename, newFilename},
});


export const addCardAssigned = (boardId, id, user) => ({
	type: types.addAssigned,
	payload: {boardId, id, user},
});

export const deleteCardAssigned = (boardId, id, username) => ({
	type: types.deleteAssigned,
	payload: {boardId, id, username},
});