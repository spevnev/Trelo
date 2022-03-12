import actions from "../actions/cardActions";

export const addCardBoard = (boardId, cards) => ({type: actions.addCardBoard, payload: {boardId, cards}});
export const deleteCardBoard = boardId => ({type: actions.deleteCardBoard, payload: {boardId}});

export const addCard = (boardId, card) => ({type: actions.addCard, payload: {boardId, card}});
export const deleteCard = (boardId, id) => ({type: actions.deleteCard, payload: {boardId, id}});

export const changeCard = (boardId, newCard) => ({type: actions.changeCard, payload: {boardId, id: newCard.id, newCard}});
export const reorderCards = (boardId, order) => ({type: actions.reorderCards, payload: {boardId, order}});