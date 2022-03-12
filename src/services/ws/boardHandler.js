import actions from "../../redux/actions/boardActions";
import {getBoard, getUser, getUserBoards} from "../../redux/selectors";
import {ChangeBoards} from "../../redux/thunkActionCreators/userActionCreator";
import userActions from "../../redux/actions/userActions";

const registerBoardHandler = (socket, store) => {
	const {getState, dispatch} = store;

	socket.on("board:change", ({boardId, title}) => {
		const board = getBoard(boardId)(getState());

		dispatch({type: actions.changeBoard, payload: {id: boardId, board: {...board, title}}});
	});
	socket.on("board:delete", boardId => {
		const userBoards = getUserBoards()(getState());
		const newBoards = userBoards.filter(board => board.id !== boardId);

		dispatch({type: actions.deleteBoard, payload: {id: boardId}});
		dispatch({type: userActions.changeBoards, payload: {newBoards}});
	});

	socket.on("board:addUser", ({boardId, user}) => {
		const board = getBoard(boardId)(getState());
		console.log("test");
		dispatch({type: actions.changeBoard, payload: {id: boardId, board: {...board, users: [...board.users, user]}}});
	});
	socket.on("board:changeUser", ({boardId, username, isOwner}) => {
		const board = getBoard(boardId)(getState());
		const users = board.users.map(user => user.username === username ? {...user, isOwner} : user);

		dispatch({type: actions.changeBoard, payload: {id: boardId, board: {...board, users}}});


		const user = getUser()(getState());
		if (user.username !== username) return;

		const userBoards = getUserBoards()(getState());
		const newBoards = userBoards.map(board => board.id === boardId ? {...board, isOwner} : board);

		dispatch(ChangeBoards(newBoards));
	});
	socket.on("board:deleteUser", ({boardId, username}) => {
		const board = getBoard(boardId)(getState());
		const users = board.users.filter(user => user.username !== username);

		dispatch({type: actions.changeBoard, payload: {id: boardId, board: {...board, users}}});


		const user = getUser()(getState());
		if (user.username !== username) return;

		const userBoards = getUserBoards()(getState());
		const newBoards = userBoards.filter(board => board.id !== boardId);

		dispatch(ChangeBoards(newBoards));
		dispatch({type: actions.deleteBoard, payload: {id: boardId}});
	});

	socket.on("board:addList", ({boardId, list}) => {
		const board = getBoard(boardId)(getState());
		const lists = [...board.lists, list];

		dispatch({type: actions.changeBoard, payload: {id: boardId, board: {...board, lists}}});
	});
	socket.on("board:changeList", ({boardId, list}) => {
		const board = getBoard(boardId)(getState());
		const lists = board.lists.map(cur => cur.id === list.id ? list : cur);

		dispatch({type: actions.changeBoard, payload: {id: boardId, board: {...board, lists}}});
	});
	socket.on("board:deleteList", ({boardId, id}) => {
		const board = getBoard(boardId)(getState());
		const lists = board.lists.filter(list => list.id !== id);

		dispatch({type: actions.changeBoard, payload: {id: boardId, board: {...board, lists}}});
	});
};

export default registerBoardHandler;
