import types from "../actions/boardActions";

// Board
export const addBoard = (id) => ({
	type: types.addBoard,
	payload: {id},
});

export const toggleFavouriteBoard = (id, isFavourite) => ({
	type: types.toggleFavourite,
	payload: {id, isFavourite},
});

export const changeBoardTitle = (id, title) => ({
	type: types.changeTitle,
	payload: {id, title},
});

// List
export const addList = (id, list) => ({
	type: types.addList,
	payload: {id, list},
});

export const deleteList = (id, listId) => ({
	type: types.deleteList,
	payload: {id, listId},
});

export const changeListTitle = (id, listId, title) => ({
	type: types.changeListTitle,
	payload: {id, listId, title},
});

// User
export const addUser = (id, user) => ({
	type: types.addUser,
	payload: {id, user},
});

export const deleteUser = (id, username) => ({
	type: types.deleteUser,
	payload: {id, username},
});

export const changeUserRole = (id, username, isOwner) => ({
	type: types.changeUserRole,
	payload: {id, username, isOwner},
});

// Card
export const addCard = (id, listId, cardId) => ({
	type: types.addCard,
	payload: {id, listId, cardId},
});