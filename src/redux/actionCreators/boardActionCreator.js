import types from "../actions/boardActions";
import {addCardBoard, deleteCardBoard} from "./cardActionCreator";
import {changeBoards} from "./userActionCreator";
import {getBoard, getUser, getUserBoards} from "../selectors";

const emptyBoard = (id, user) => ({
	title: "New Board",
	id,
	lists: [{title: "Backlog", id: "id1"}, {title: "Progress", id: "id2"}, {title: "Done", id: "id3"}],
	users: [{...user, boards: undefined, isOwner: true}],
});


const setStatus = (id, status) => ({type: types.setStatus, payload: {id, status}});

export const fetchBoard = (id, updateState = true) => async (dispatch, getState, {board, card}) => {
	if (updateState) dispatch(addBoard({id, status: "LOADING"}));

	const cards = await card.getCards(id);
	const brd = await board.getBoard(id);
	if (brd === null || cards === null) return dispatch(setStatus(id, "ERROR"));

	dispatch(addCardBoard(id, cards.cards));
	dispatch(addBoard({...brd, status: "READY"}));
};

export const newBoard = (id, onSuccess) => async (dispatch, getState, {board}) => {
	const user = getUser()(getState());
	const boardObject = emptyBoard(id, user);

	try {
		await board.createBoard(boardObject);
		onSuccess();

		dispatch(addCardBoard(id, []));
		dispatch(addBoard({...boardObject, status: "READY"}));
		dispatch(changeBoards([...user.boards, {id, isOwner: true, isFavourite: false, title: "New Board"}]));
	} catch (e) {
	}
};

export const addBoard = board => ({type: types.addBoard, payload: {board}});

export const deleteBoard = (id, onSuccess) => async (dispatch, getState, {board}) => {
	await board.deleteBoard(id);
	onSuccess();

	dispatch(changeBoards(getUserBoards()(getState()).filter(cur => cur.id !== id)));
	dispatch(deleteCardBoard(id));

	dispatch({
		type: types.deleteBoard,
		payload: {id},
	});
};

export const changeBoard = (id, newBoard) => (dispatch, getState, {board}) => {
	if (newBoard && newBoard.title.length > 0 && getBoard(id)(getState()).title !== newBoard.title) board.changeTitle(id, newBoard.title);

	dispatch({
		type: types.changeBoard,
		payload: {id, board: newBoard},
	});
};

export const addUser = (id, username, onSuccess, onError) => async (dispatch, getState, {board}) => {
	const [error, data] = await board.addUser(username, id);
	if (error) return onError(error);

	onSuccess(data);
	const boardData = getBoard(id)(getState());
	dispatch(changeBoard(id, {...boardData, users: [...boardData.users, {...data, isOwner: false}]}));
};

export const deleteUser = (id, username) => (dispatch, getState, {board}) => {
	const boardData = getBoard(id)(getState());

	dispatch(changeBoard(id, {...boardData, users: boardData.users.filter(cur => cur.username !== username)}));
	board.deleteUser(username, id);
};

export const changeRole = (id, username, isOwner) => (dispatch, getState, {board}) => {
	const boardData = getBoard(id)(getState());

	dispatch(changeBoard(id, {...boardData, users: boardData.users.map(cur => cur.username === username ? {...cur, isOwner} : cur)}));
	board.changeRole(id, username, isOwner);
};

export const createList = (boardId, id, title) => (dispatch, getState, {board}) => {
	const boardData = getBoard(boardId)(getState());
	let order = -1;
	boardData.lists.forEach(cur => order = Math.max(cur.order, order));
	order++;

	dispatch(changeBoard(boardId, {...boardData, lists: [...boardData.lists, {title: title, id, order}]}));
	board.createList(boardId, id, title, order);
};

export const deleteList = (boardId, id) => (dispatch, getState, {board}) => {
	const boardData = getBoard(boardId)(getState());

	dispatch(changeBoard(boardId, {...boardData, lists: boardData.lists.filter(cur => cur.id !== id)}));
	board.deleteList(boardId, id);
};