import {ChangeBoards} from "./userActionCreator";
import {getBoard, getUser, getUserBoards} from "../selectors";
import socket from "../../services/ws";
import {addBoard, changeBoard, deleteBoard, setStatus} from "../actionCreators/boardActionCreator";
import {addCardBoard, deleteCardBoard} from "../actionCreators/cardActionCreator";

const newEmptyBoard = (id, user) => ({
	title: "New Board",
	id,
	lists: [{title: "Backlog", id: "id1"}, {title: "Progress", id: "id2"}, {title: "Done", id: "id3"}],
	users: [{...user, boards: undefined, isOwner: true}],
});

export const FetchBoard = (id, updateState = true) => async (dispatch, getState, {boardAPI, cardAPI}) => {
	if (updateState) dispatch(addBoard({id, status: "LOADING"}));

	const cards = await cardAPI.getCards(id);
	const board = await boardAPI.getBoard(id);
	if (!board || !cards) return dispatch(setStatus(id, "ERROR"));

	dispatch(addCardBoard(id, cards.cards));
	dispatch(addBoard({...board, status: "READY"}));
};

export const NewBoard = (id, onSuccess) => async (dispatch, getState, {boardAPI}) => {
	const user = getUser()(getState());
	const boardObject = newEmptyBoard(id, user);

	try {
		await boardAPI.createBoard(boardObject);
		onSuccess();

		dispatch(addCardBoard(id, []));
		dispatch(addBoard({...boardObject, status: "READY"}));
		dispatch(ChangeBoards([...user.boards, {id, isOwner: true, isFavourite: false, title: "New Board"}]));
	} catch (e) {
	}
};

export const DeleteBoard = (id, callback) => (dispatch, getState, {boardAPI}) => {
	dispatch(ChangeBoards(getUserBoards()(getState()).filter(board => board.id !== id)));
	dispatch(deleteCardBoard(id));

	callback();
	dispatch(deleteBoard(id));

	boardAPI.deleteBoard(id);
};

export const ChangeBoard = (id, newBoard) => (dispatch, getState, {boardAPI}) => {
	const hasTitle = board => board && board.title;

	const prevBoard = getBoard(id)(getState()) || {};
	if (hasTitle(newBoard) && prevBoard.title !== newBoard.title)
		boardAPI.changeTitle(id, newBoard.title, socket.id);

	dispatch(changeBoard(id, newBoard));
};

export const AddUser = (id, username, onSuccess, onError) => async (dispatch, getState, {boardAPI}) => {
	const [error, data] = await boardAPI.addUser(username, id, socket.id);
	if (error) return onError(error);

	onSuccess(data);
	const boardData = getBoard(id)(getState());
	dispatch(ChangeBoard(id, {...boardData, users: [...boardData.users, {...data, isOwner: false}]}));
};

export const DeleteUser = (id, username) => (dispatch, getState, {boardAPI}) => {
	const boardData = getBoard(id)(getState());

	dispatch(ChangeBoard(id, {...boardData, users: boardData.users.filter(user => user.username !== username)}));
	boardAPI.deleteUser(username, id);
};

export const ChangeUserRole = (id, username, isOwner) => (dispatch, getState, {boardAPI}) => {
	const boardData = getBoard(id)(getState());

	dispatch(ChangeBoard(id, {...boardData, users: boardData.users.map(user => user.username === username ? {...user, isOwner} : user)}));
	boardAPI.changeRole(id, username, isOwner, socket.id);
};

export const CreateList = (boardId, id, title) => (dispatch, getState, {boardAPI}) => {
	const boardData = getBoard(boardId)(getState());
	let order = -1;
	boardData.lists.forEach(list => order = Math.max(list.order, order));
	order++;

	dispatch(ChangeBoard(boardId, {...boardData, lists: [...boardData.lists, {title: title, id, order}]}));
	boardAPI.createList(boardId, {id, title, order}, socket.id);
};

export const DeleteList = (boardId, id) => (dispatch, getState, {boardAPI}) => {
	const boardData = getBoard(boardId)(getState());

	dispatch(ChangeBoard(boardId, {...boardData, lists: boardData.lists.filter(list => list.id !== id)}));
	boardAPI.deleteList(boardId, id);
};