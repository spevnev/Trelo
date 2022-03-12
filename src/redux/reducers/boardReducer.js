import actions from "../actions/boardActions";

const boardReducer = (state = [], action) => {
	const payload = action.payload;

	const changeBoard = func => state.map(board => board.id === payload.id ? func(board) : board);

	switch (action.type) {
		case actions.setStatus:
			return changeBoard(board => ({...board, status: payload.status}));

		case actions.addBoard:
			const len = state.filter(board => board.id === payload.board.id).length;
			if (len === 0) return [...state, payload.board];
			return state.map(board => board.id === payload.board.id ? payload.board : board);
		case actions.deleteBoard:
			return state.filter(board => board.id !== payload.id);
		case actions.changeBoard:
			return changeBoard(() => payload.board);

		default:
			return state;
	}
};

export default boardReducer;