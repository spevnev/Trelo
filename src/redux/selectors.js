export const getUser = () => state => state.user;

export const getUserBoards = () => state => state.user.boards;

export const getBoard = id => state => {
	const board = state.board.filter(cur => cur.id === id);
	if (board.length !== 1) return null;

	return board[0];
};

export const getCard = (boardId, cardId) => state => {
	const cards = getCards(boardId)(state);
	if (!cards) return null;

	const card = cards.filter(cur => cur.id === cardId);
	if (card.length !== 1) return null;

	return card[0];
};

export const getCards = id => state => {
	const cards = state.card.filter(cur => cur.id === id);
	if (cards.length !== 1) return null;

	return cards[0].cards;
};