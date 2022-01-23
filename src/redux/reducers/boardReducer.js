import types from "../actions/boardActions";

const CURRENT_USER = {username: "CURRENT USER", userIcon: "https://www.manufacturingusa.com/sites/manufacturingusa.com/files/default.png", isOwner: true};
const defaultState = [{
	title: "Board 1", isFavourite: false, id: "1",
	users: [{username: "Username 1", userIcon: "https://www.manufacturingusa.com/sites/manufacturingusa.com/files/default.png", isOwner: true},
		{username: "Username 2", userIcon: "https://www.manufacturingusa.com/sites/manufacturingusa.com/files/default.png", isOwner: false}],
	lists: [{title: "First list", id: "1"}, {title: "List", id: "2"}],
}];

const boardReducer = (state = defaultState, action) => {
	const payload = action.payload;

	switch (action.type) {
		case types.addBoard:
			return [...state, {title: "", isFavourite: false, id: payload.id, lists: [], users: [CURRENT_USER]}];
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