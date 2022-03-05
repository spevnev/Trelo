import request from "./request";

export const getCards = axios => id => request(axios.get(`/card/${id}`));
export const addCard = axios => (boardId, card) => request(axios.post(`/card/`, {card, boardId}));
export const changeCard = axios => (boardId, newCard) => request(axios.put(`/card/`, {card: newCard, boardId}));
export const deleteCard = axios => (boardId, id) => request(axios.delete(`/card/${boardId}/${id}`));

export const addFiles = axios => (boardId, cardId, files) => request(axios.post(`/card/addFiles`, {boardId, cardId, files}));
export const deleteFile = axios => (boardId, url) => request(axios.post(`/card/deleteFile`, {boardId, url}));
export const renameFile = axios => (boardId, filename, url) => request(axios.put(`/card/renameFile`, {boardId, url, filename}));