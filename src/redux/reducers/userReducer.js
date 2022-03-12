import actions from "../actions/userActions";

const userReducer = (state = {}, action) => {
	const payload = action.payload;

	switch (action.type) {
		case actions.setUser:
			return {...payload.user};

		case actions.changeBoards:
			return {...state, boards: payload.newBoards};

		default:
			return state;
	}
};

export default userReducer;