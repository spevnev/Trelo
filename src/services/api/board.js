import request from "../request";
import axios from "../axiosClient";

export const getBoard = id => request(axios.get(`/board/${id}`));
export const createBoard = (board) => request(axios.post("/board", {title: board.title, boardId: board.id}));
export const changeBoard = (boardId, title) => request(axios.put("/board", {boardId, title}));
export const deleteBoard = id => request(axios.delete(`/board/${id}`));

export const createList = (boardId, list) => request(axios.post("/board/list", {boardId, list}));
export const changeList = (boardId, list) => request(axios.put("/board/list", {boardId, list}));
export const deleteList = (boardId, id) => request(axios.delete(`/board/list/${boardId}/${id}`));

export const addUser = (username, boardId) => request(axios.post(`/board/user`, {username: username.toLowerCase(), boardId}));
export const changeUser = (boardId, username, isOwner) => request(axios.put(`/board/user`, {boardId, username, isOwner}));
export const deleteUser = (username, boardId) => request(axios.delete(`/board/user/${boardId}/${username.toLowerCase()}`));
