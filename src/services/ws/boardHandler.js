import {getBoard, getUser, getUserBoards} from "../../redux/selectors";
import {changeBoards} from "../../redux/actionCreators/userActionCreator";
import {changeBoard, deleteBoard} from "../../redux/actionCreators/boardActionCreator";

const registerBoardHandler = (socket, store) => {
	const {getState, dispatch} = store;

	socket.on("board:add", ({id, title}) => {
		const userBoards = getUserBoards()(getState());

		dispatch(changeBoards([...userBoards, {id, title, isFavourite: false, isOwner: false}]));
	});
	socket.on("board:change", ({boardId, title}) => {
		const board = getBoard(boardId)(getState());

		dispatch(changeBoard(boardId, {...board, title}));
	});
	socket.on("board:delete", boardId => {
		const userBoards = getUserBoards()(getState());
		const newBoards = userBoards.filter(board => board.id !== boardId);

		dispatch(deleteBoard(boardId));
		dispatch(changeBoards(newBoards));
	});

	socket.on("board:addUser", ({boardId, user}) => {
		const board = getBoard(boardId)(getState());

		dispatch(changeBoard(boardId, {...board, users: [...board.users, user]}));
	});
	socket.on("board:changeUser", ({boardId, username, isOwner}) => {
		const user = getUser()(getState());
		if (user.username === username) {
			const userBoards = getUserBoards()(getState());
			const newBoards = userBoards.map(board => board.id === boardId ? {...board, isOwner} : board);

			dispatch(changeBoards(newBoards));
		}

		const board = getBoard(boardId)(getState());
		if (!board) return;

		const users = board.users.map(user => user.username === username ? {...user, isOwner} : user);

		dispatch(changeBoard(boardId, {...board, users}));
	});
	socket.on("board:deleteUser", ({boardId, username}) => {
		const board = getBoard(boardId)(getState());
		const users = board.users.filter(user => user.username !== username);

		dispatch(changeBoard(boardId, {...board, users}));

		const user = getUser()(getState());
		if (user.username !== username) return;

		const userBoards = getUserBoards()(getState());
		const newBoards = userBoards.filter(board => board.id !== boardId);

		dispatch(changeBoards(newBoards));
		dispatch(deleteBoard(boardId));
	});

	socket.on("board:addList", ({boardId, list}) => {
		const board = getBoard(boardId)(getState());
		const lists = [...board.lists, list];

		dispatch(changeBoard(boardId, {...board, lists}));
	});
	socket.on("board:changeList", ({boardId, list}) => {
		const board = getBoard(boardId)(getState());
		const lists = board.lists.map(cur => cur.id === list.id ? list : cur);

		dispatch(changeBoard(boardId, {...board, lists}));
	});
	socket.on("board:deleteList", ({boardId, id}) => {
		const board = getBoard(boardId)(getState());
		const lists = board.lists.filter(list => list.id !== id);

		dispatch(changeBoard(boardId, {...board, lists}));
	});
};

export default registerBoardHandler;
