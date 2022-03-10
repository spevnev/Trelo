import types from "../actions/boardActions";
import {AddCardBoard, DeleteCardBoard} from "./cardActionCreator";
import {ChangeBoards} from "./userActionCreator";
import {getBoard, getUser, getUserBoards} from "../selectors";

const newEmptyBoard = (id, user) => ({
	title: "New Board",
	id,
	lists: [{title: "Backlog", id: "id1"}, {title: "Progress", id: "id2"}, {title: "Done", id: "id3"}],
	users: [{...user, boards: undefined, isOwner: true}],
});


const setStatus = (id, status) => ({type: types.setStatus, payload: {id, status}});

export const FetchBoard = (id, updateState = true) => async (dispatch, getState, {boardAPI, cardAPI}) => {
	if (updateState) dispatch(AddBoard({id, status: "LOADING"}));

	const cards = await cardAPI.getCards(id);
	const board = await boardAPI.getBoard(id);
	if (!board || !cards) return dispatch(setStatus(id, "ERROR"));

	dispatch(AddCardBoard(id, cards.cards));
	dispatch(AddBoard({...board, status: "READY"}));
};

export const NewBoard = (id, onSuccess) => async (dispatch, getState, {boardAPI}) => {
	const user = getUser()(getState());
	const boardObject = newEmptyBoard(id, user);

	try {
		await boardAPI.createBoard(boardObject);
		onSuccess();

		dispatch(AddCardBoard(id, []));
		dispatch(AddBoard({...boardObject, status: "READY"}));
		dispatch(ChangeBoards([...user.boards, {id, isOwner: true, isFavourite: false, title: "New Board"}]));
	} catch (e) {
	}
};

export const AddBoard = board => ({type: types.addBoard, payload: {board}});

export const DeleteBoard = (id, callback) => (dispatch, getState, {boardAPI}) => {
	boardAPI.deleteBoard(id);

	dispatch(ChangeBoards(getUserBoards()(getState()).filter(board => board.id !== id)));
	dispatch(DeleteCardBoard(id));

	callback();

	dispatch({
		type: types.deleteBoard,
		payload: {id},
	});
};

export const ChangeBoard = (id, newBoard) => (dispatch, getState, {boardAPI}) => {
	const hasTitle = board => board && board.title;

	const prevBoard = getBoard(id)(getState()) || {};
	if (hasTitle(newBoard) && prevBoard.title !== newBoard.title) boardAPI.changeTitle(id, newBoard.title);

	dispatch({
		type: types.changeBoard,
		payload: {id, board: newBoard},
	});
};

export const AddUser = (id, username, onSuccess, onError) => async (dispatch, getState, {boardAPI}) => {
	const [error, data] = await boardAPI.addUser(username, id);
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

export const ChangeRole = (id, username, isOwner) => (dispatch, getState, {boardAPI}) => {
	const boardData = getBoard(id)(getState());

	dispatch(ChangeBoard(id, {...boardData, users: boardData.users.map(user => user.username === username ? {...user, isOwner} : user)}));
	boardAPI.changeRole(id, username, isOwner);
};

export const CreateList = (boardId, id, title) => (dispatch, getState, {boardAPI}) => {
	const boardData = getBoard(boardId)(getState());
	let order = -1;
	boardData.lists.forEach(list => order = Math.max(list.order, order));
	order++;

	dispatch(ChangeBoard(boardId, {...boardData, lists: [...boardData.lists, {title: title, id, order}]}));
	boardAPI.createList(boardId, {id, title, order});
};

export const DeleteList = (boardId, id) => (dispatch, getState, {boardAPI}) => {
	const boardData = getBoard(boardId)(getState());

	dispatch(ChangeBoard(boardId, {...boardData, lists: boardData.lists.filter(list => list.id !== id)}));
	boardAPI.deleteList(boardId, id);
};