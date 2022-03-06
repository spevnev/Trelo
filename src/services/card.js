import request from "./request";

export const getCards = axios => id => request(axios.get(`/card/${id}`));
export const addCard = axios => (boardId, card) => request(axios.post("/card/", {boardId, card}));
export const changeCard = axios => (boardId, newCard) => request(axios.put("/card/", {boardId, card: newCard}));
export const reorderCards = axios => (boardId, order) => request(axios.put("/card/reorder/", {boardId, order}));
export const deleteCard = axios => (boardId, id) => request(axios.delete(`/card/${boardId}/${id}`));

export const addFiles = axios => (boardId, cardId, files) => request(axios.post("/card/addFiles", {boardId, cardId, files}));
export const deleteFile = axios => (boardId, url) => request(axios.post("/card/deleteFile", {boardId, url}));
export const renameFile = axios => (boardId, filename, url) => request(axios.put("/card/renameFile", {boardId, url, filename}));