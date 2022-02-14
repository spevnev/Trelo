import types from "../actions/boardActions";
import {addCardBoard} from "./cardActionCreator";
import {changeBoards} from "./userActionCreator";

const setStatus = (id, status) => ({type: types.setStatus, payload: {id, status}});


export const fetchBoard = id => async (dispatch, getState, {board, card}) => {
	dispatch(addBoard({id, status: "LOADING"}));

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

export const changeBoard = (id, newBoard) => (dispatch, getState, {board}) => {
	if (newBoard.title.length > 0) board.changeBoard(id, {...newBoard, status: undefined});

	dispatch({
		type: types.changeBoard,
		payload: {id, board: newBoard},
	});
};