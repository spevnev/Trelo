import types from "../actions/userActions";

const userReducer = (state = {}, action) => {
	const payload = action.payload;

	switch (action.type) {
		case types.setUser:
			return {...payload.user};

		case types.changeBoards:
			return {...state, boards: payload.newBoards};

		default:
			return state;
	}
};

export default userReducer;