import types from "../actions/cardActions";

const cardReducer = (state = [], action) => {
	const payload = action.payload;

	switch (action.type) {
		case types.addCardBoard:
			return [...state, {id: payload.boardId, cards: payload.cards}];

		case types.addCard:
			return state.map(cur => cur.id === payload.boardId ? {
				...cur,
				cards: [...cur.cards, {title: "", id: payload.id, listId: payload.listId, description: "", images: [], files: [], assigned: []}],
			} : cur);
		case types.changeCard:
			return state.map(cur => cur.id === payload.boardId ? {...cur, cards: cur.cards.map(cur => cur.id === payload.id ? {...cur, ...payload.changes} : cur)} : cur);
		case types.deleteCard:
			return state.map(cur => cur.id === payload.boardId ? {...cur, cards: cur.cards.filter(cur => cur.id !== payload.id)} : cur);

		case types.deleteCardsInList:
			return state.map(cur => cur.id === payload.boardId ? {...cur, cards: cur.cards.filter(cur => cur.listId !== payload.listId)} : cur);
		case types.deleteCardsInBoard:
			return state.filter(cur => cur.id !== payload.boardId);
		case types.deleteAssignedInCards:
			return state.map(cur => cur.id === payload.boardId ? {
				...cur,
				cards: cur.cards.map(cur => ({...cur, assigned: cur.assigned.filter(cur => cur.username !== payload.username)})),
			} : cur);

		default:
			return state;
	}
};

export default cardReducer;