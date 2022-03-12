import request from "../request";

export const getCards = axios => id => request(axios.get(`/card/${id}`));
export const addCard = axios => (boardId, card, socketId) => request(axios.post("/card/", {boardId, socketId, card}));
export const changeCard = axios => (boardId, card, socketId) => request(axios.put("/card/", {boardId, socketId, card}));
export const reorderCards = axios => (boardId, order, socketId) => request(axios.put("/card/reorder/", {boardId, order, socketId}));
export const deleteCard = axios => (boardId, id) => request(axios.delete(`/card/${boardId}/${id}`));

export const addFiles = axios => (boardId, cardId, files, socketId) => request(axios.post("/card/addFiles", {boardId, cardId, files, socketId}));
export const renameFile = axios => (boardId, file, socketId) => request(axios.put("/card/renameFile", {boardId, file, socketId}));
export const deleteFile = axios => (boardId, url) => request(axios.post("/card/deleteFile", {boardId, url}));
