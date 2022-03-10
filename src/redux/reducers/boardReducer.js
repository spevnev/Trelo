import types from "../actions/boardActions";

const boardReducer = (state = [], action) => {
	const payload = action.payload;

	const changeBoard = func => state.map(board => board.id === payload.id ? func(board) : board);

	switch (action.type) {
		case types.setStatus:
			return changeBoard(board => ({...board, status: payload.status}));

		case types.addBoard:
			const len = state.filter(board => board.id === payload.board.id).length;
			if (len === 0) return [...state, payload.board];
			return state.map(board => board.id === payload.board.id ? payload.board : board);
		case types.deleteBoard:
			return state.filter(board => board.id !== payload.id);
		case types.changeBoard:
			return changeBoard(() => payload.board);

		default:
			return state;
	}
};

export default boardReducer;