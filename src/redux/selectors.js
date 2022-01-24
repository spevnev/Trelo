export const getBoards = () => state => state.board;

export const getBoard = id => state => state.board.filter(cur => cur.id === id)[0];

export const getCards = id => state => state.card.filter(cur => cur.id === id)[0].cards;

export const getCard = (boardId, cardId) => state => state.card.filter(cur => cur.id === boardId)[0].cards.filter(cur => cur.id === cardId)[0];