import types from "../actions/cardActions";

const cardReducer = (state = [], action) => {
	const payload = action.payload;

	const changeBoard = func => state.map(board => board.id === payload.boardId ? func(board) : board);

	switch (action.type) {
		case types.addCardBoard:
			const l = state.filter(board => board.id === payload.boardId).length;
			if (l === 0) return [...state, {id: payload.boardId, cards: payload.cards}];
			return state.map(board => board.id === payload.boardId ? {id: payload.boardId, cards: payload.cards} : board);
		case types.deleteCardBoard:
			return state.filter(board => board.id !== payload.boardId);

		case types.addCard:
			return changeBoard(cardBoard => ({...cardBoard, cards: [...cardBoard.cards, payload.card]}));
		case types.deleteCard:
			return changeBoard(cardBoard => ({...cardBoard, cards: cardBoard.cards.filter(card => card.id !== payload.id)}));

		case types.changeCard:
			return changeBoard(cardBoard => ({...cardBoard, cards: cardBoard.cards.map(card => card.id === payload.id ? payload.newCard : card)}));
		case types.reorderCards:
			const ids = payload.order.map(orderObj => orderObj.id);
			const orders = payload.order.map(orderObj => orderObj.order);

			return changeBoard(cardBoard => ({
				...cardBoard, cards: cardBoard.cards.map(card => {
					const i = ids.indexOf(card.id);
					if (i === -1) return card;
					return {...card, order: orders[i]};
				}),
			}));

		default:
			return state;
	}
};

export default cardReducer;