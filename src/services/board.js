import request from "./request";

export const getBoard = axios => id => request(axios.get(`/board/${id}`));
export const createBoard = axios => board => request(axios.post("/board", {title: board.title, boardId: board.id}));
export const changeBoard = axios => (boardId, title) => request(axios.put("/board", {boardId, title}));
export const deleteBoard = axios => id => request(axios.delete(`/board/${id}`));

export const createList = axios => (boardId, id, title, order) => request(axios.post("/board/list", {boardId, id, title, order}));
export const changeList = axios => (boardId, {id, title, order}) => request(axios.put("/board/list", {boardId, id, title, order}));
export const deleteList = axios => (boardId, id) => request(axios.delete(`/board/list/${boardId}/${id}`));

export const addUser = axios => (username, boardId) => request(axios.post(`/board/user`, {username: username.toLowerCase(), boardId}));
export const deleteUser = axios => (username, boardId) => request(axios.delete(`/board/user/${boardId}/${username.toLowerCase()}`));
export const changeUser = axios => (boardId, username, isOwner) => request(axios.put(`/board/user`, {boardId, username, isOwner}));