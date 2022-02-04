import types from "../actions/boardActions";

const boardReducer = (state = [], action) => {
	const payload = action.payload;

	const changeBoard = func => state.map(cur => cur.id === payload.id ? func(cur) : cur);

	switch (action.type) {
		case types.setStatus:
			return changeBoard(cur => ({...cur, status: payload.status}));

		case types.addBoard:
			const l = state.filter(cur => cur.id === payload.board.id).length;
			if (l === 0) return [...state, payload.board];
			return state.map(cur => cur.id === payload.board.id ? payload.board : cur);

		case types.deleteBoard:
			return state.filter(cur => cur.id !== payload.id);

		case types.changeBoard:
			return changeBoard(() => payload.board);

		default:
			return state;
	}
};

export default boardReducer;