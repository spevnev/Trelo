import types from "../actions/cardActions";

const emptyCard = (id, listId) => ({title: "", id: id, listId: listId, description: "", images: [], files: [], assigned: []});

const cardReducer = (state = [], action) => {
	const payload = action.payload;

	const changeBoard = func => state.map(cur => cur.id === payload.boardId ? func(cur) : cur);

	switch (action.type) {
		case types.addCardBoard:
			return [...state, {id: payload.boardId, cards: payload.cards}];

		case types.addCard:
			return changeBoard(cur => ({...cur, cards: [...cur.cards, emptyCard(payload.id, payload.listId)]}));

		case types.deleteCard:
			return changeBoard(cur => ({...cur, cards: cur.cards.filter(cur => cur.id !== payload.id)}));
		case types.deleteCardsInBoard:
			return state.filter(cur => cur.id !== payload.boardId);

		case types.changeCard:
			return changeBoard(cur => ({...cur, cards: cur.cards.map(cur => cur.id === payload.id ? payload.newCard : cur)}));

		default:
			return state;
	}
};

export default cardReducer;