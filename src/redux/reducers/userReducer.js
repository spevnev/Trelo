import types from "../actions/userActions";

const userReducer = (state = {}, action) => {
	const payload = action.payload;

	switch (action.type) {
		case types.setUser:
			return payload.user;

		default:
			return state;
	}
};

export default userReducer;