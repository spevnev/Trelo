import types from "../actions/boardActions";
import {addCardBoard} from "./cardActionCreator";
import {changeBoards} from "./userActionCreator";

const setStatus = (id, status) => ({type: types.setStatus, payload: {id, status}});

export const fetchBoard = (id, silent = false) => async (dispatch, getState, {board, card}) => {
	if (!silent) dispatch(addBoard({id, status: "LOADING"}));

	const cards = await card.getCards(id);
	const brd = await board.getBoard(id);
	if (brd === null || cards === null) return dispatch(setStatus(id, "ERROR"));

	dispatch(addCardBoard(id, cards.cards));
	dispatch(addBoard({...brd, status: "READY"}));
};

export const newBoard = (id, navigate) => async (dispatch, getState, {board}) => {
	const user = getState().user;
	const boardObject = {title: "New Board", id, lists: [], users: [{...user, boards: undefined, isOwner: true}]};

	if (await board.createBoard(boardObject) === null) return;

	dispatch(addCardBoard(id, []));
	dispatch(addBoard({...boardObject, status: "READY"}));
	dispatch(changeBoards([...user.boards, {id, isOwner: true, isFavourite: false, title: "New Board"}]));

	navigate(`/board/${id}/settings`);
};

export const addBoard = board => ({type: types.addBoard, payload: {board}});

export const deleteBoard = id => (dispatch, getState, {board}) => {
	board.deleteBoard(id);

	dispatch(changeBoards(getState().user.boards.filter(cur => cur.id !== id)));
	dispatch({
		type: types.deleteBoard,
		payload: {id},
	});
};

export const changeBoard = (id, newBoard, prev) => async (dispatch, getState, {board}) => {
	if (newBoard.title.length > 0 && (!prev || prev.title !== newBoard.title)) await board.changeTitle(id, newBoard.title);

	dispatch({
		type: types.changeBoard,
		payload: {id, board: newBoard},
	});
};

export const addUser = (id, username, onSuccess, onError) => async (dispatch, getState, {board}) => {
	const [error, data] = await board.addUser(username, id);
	if (error) return onError(error);

	onSuccess(data);
	const boardData = getState().board.filter(cur => cur.id === id)[0];
	dispatch(changeBoard(id, {...boardData, users: [...boardData.users, {...data, isOwner: false}]}));
};

export const deleteUser = (id, username) => async (dispatch, getState, {board}) => {
	const data = await board.deleteUser(username, id);
	if (data === null) return;

	const boardData = getState().board.filter(cur => cur.id === id)[0];
	dispatch(changeBoard(id, {...boardData, users: boardData.users.filter(cur => cur.username !== username)}));
};

export const changeRole = (id, username, isOwner) => async (dispatch, getState, {board}) => {
	const data = await board.changeRole(id, username, isOwner);
	if (data === null) return;

	const boardData = getState().board.filter(cur => cur.id === id)[0];
	dispatch(changeBoard(id, {...boardData, users: boardData.users.map(cur => cur.username === username ? {...cur, isOwner} : cur)}));
};

export const createList = (boardId, id, title) => async (dispatch, getState, {board}) => {
	const data = await board.createList(boardId, id, title);
	if (data === null) return;

	const boardData = getState().board.filter(cur => cur.id === boardId)[0];
	dispatch(changeBoard(boardId, {...boardData, lists: [...boardData.lists, {title: title, id}]}));
};
export const deleteList = (boardId, id) => async (dispatch, getState, {board}) => {
	const data = await board.deleteList(boardId, id);
	if (data === null) return;

	const boardData = getState().board.filter(cur => cur.id === boardId)[0];
	dispatch(changeBoard(boardId, {...boardData, lists: boardData.lists.filter(cur => cur.id !== id)}));
};