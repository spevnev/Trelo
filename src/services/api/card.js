import request from "../request";
import axios from "../axiosClient";

export const getCards = id => request(axios.get(`/card/${id}`));
export const addCard = (boardId, card) => request(axios.post("/card/", {boardId, card}));
export const changeCard = (boardId, card) => request(axios.put("/card/", {boardId, card}));
export const reorderCards = (boardId, order) => request(axios.put("/card/reorder/", {boardId, order}));
export const deleteCard = (boardId, id) => request(axios.delete(`/card/${boardId}/${id}`));

export const addFiles = (boardId, cardId, files) => request(axios.post("/card/addFiles", {boardId, cardId, files}));
export const renameFile = (boardId, file) => request(axios.put("/card/renameFile", {boardId, file}));
export const deleteFile = (boardId, url) => request(axios.post("/card/deleteFile", {boardId, url}));
