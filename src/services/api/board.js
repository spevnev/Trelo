import request from "../request";

export const getBoard = axios => id => request(axios.get(`/board/${id}`));
export const createBoard = axios => (board) => request(axios.post("/board", {title: board.title, boardId: board.id}));
export const changeBoard = axios => (boardId, title, socketId) => request(axios.put("/board", {boardId, title, socketId}));
export const deleteBoard = axios => id => request(axios.delete(`/board/${id}`));

export const createList = axios => (boardId, list, socketId) => request(axios.post("/board/list", {boardId, list, socketId}));
export const changeList = axios => (boardId, list, socketId) => request(axios.put("/board/list", {boardId, list, socketId}));
export const deleteList = axios => (boardId, id) => request(axios.delete(`/board/list/${boardId}/${id}`));

export const addUser = axios => (username, boardId, socketId) => request(axios.post(`/board/user`, {username: username.toLowerCase(), boardId, socketId}));
export const changeUser = axios => (boardId, username, isOwner, socketId) => request(axios.put(`/board/user`, {boardId, username, isOwner, socketId}));
export const deleteUser = axios => (username, boardId) => request(axios.delete(`/board/user/${boardId}/${username.toLowerCase()}`));
