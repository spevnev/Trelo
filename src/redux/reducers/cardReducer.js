import types from "../actions/cardActions";

const cardReducer = (state = [], action) => {
	const payload = action.payload;

	const changeBoard = func => state.map(cur => cur.id === payload.boardId ? func(cur) : cur);

	switch (action.type) {
		case types.addCardBoard:
			return [...state, {id: payload.boardId, cards: payload.cards}];
		case types.deleteCardBoard:
			return state.filter(cur => cur.id !== payload.boardId);

		case types.addCard:
			return changeBoard(cur => ({...cur, cards: [...cur.cards, payload.card]}));
		case types.deleteCard:
			return changeBoard(cur => ({...cur, cards: cur.cards.filter(cur => cur.id !== payload.id)}));
		case types.changeCard:
			return changeBoard(cur => ({...cur, cards: cur.cards.map(cur => cur.id === payload.id ? payload.newCard : cur)}));

		default:
			return state;
	}
};

export default cardReducer;