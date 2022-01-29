import types from "../actions/boardActions";

const boardReducer = (state = [], action) => {
	const payload = action.payload;

	switch (action.type) {
		case types.setStatus:
			return state.map(cur => cur.id === payload.id ? {...cur, status: payload.status} : cur);

		case types.addBoard:
			return [...state, payload.board];
		case types.deleteBoard:
			return state.filter(cur => cur.id !== payload.id);
		case types.toggleFavourite:
			return state.map(cur => cur.id === payload.id ? {...cur, isFavourite: payload.isFavourite} : cur);
		case types.changeTitle:
			return state.map(cur => cur.id === payload.id ? {...cur, title: payload.title} : cur);

		case types.changeListTitle:
			return state.map(cur => cur.id === payload.id ? {...cur, lists: cur.lists.map(cur => cur.id === payload.listId ? {...cur, title: payload.title} : cur)} : cur);
		case types.addList:
			return state.map(cur => cur.id === payload.id ? {...cur, lists: [...cur.lists, payload.list]} : cur);
		case types.deleteList:
			return state.map(cur => cur.id === payload.id ? {...cur, lists: cur.lists.filter(cur => cur.id !== payload.listId)} : cur);

		case types.addUser:
			return state.map(cur => cur.id === payload.id ? {...cur, users: [...cur.users, payload.user]} : cur);
		case types.deleteUser:
			return state.map(cur => cur.id === payload.id ? {...cur, users: cur.users.filter(cur => cur.username !== payload.username)} : cur);
		case types.changeUserRole:
			return state.map(cur => cur.id === payload.id ? {
				...cur,
				users: cur.users.map(cur => cur.username === payload.username ? {...cur, isOwner: payload.isOwner} : cur),
			} : cur);

		default:
			return state;
	}
};

export default boardReducer;