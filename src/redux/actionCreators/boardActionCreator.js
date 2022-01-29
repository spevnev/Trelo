import types from "../actions/boardActions";
import cardTypes from "../actions/cardActions";
import {addCardBoard} from "./cardActionCreator";

// Fetching
const setStatus = (id, status) => ({
	type: types.setStatus,
	payload: {id, status},
});

export const fetchBoard = id => async (dispatch, getState, {board, card}) => {
	dispatch(addBoard({id, status: "LOADING"}));

	const cards = (await card.getCards(id));
	const brd = await board.getBoard(id);
	if (brd === null || cards === null) return dispatch(setStatus(id, "ERROR"));

	dispatch(addCardBoard(id, cards.cards));
	dispatch(addBoard({...brd, status: "READY"}));
};

// Board
export const addBoard = board => ({
	type: types.addBoard,
	payload: {board},
});

export const newBoard = id => (dispatch) => {
	dispatch({
		type: cardTypes.addCardBoard,
		payload: {boardId: id, cards: []},
	});

	dispatch({
		type: types.addBoard,
		payload: {
			id,
			board: {
				title: "",
				status: "READY",
				isFavourite: false,
				id,
				lists: [],
				users: [{username: "CURRENT_USER", userIcon: "https://www.manufacturingusa.com/sites/manufacturingusa.com/files/default.png", isOwner: true}],
			},
		},
	});
};

export const deleteBoard = (id) => async (dispatch, getState, {board}) => {
	const res = await board.deleteBoard(id);

	dispatch({
		type: types.deleteBoard,
		payload: {id},
	});
};

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