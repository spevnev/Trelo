import socket from "./index";

export const joinRoom = boardId => socket.emit("room:join", {boardId, token: localStorage.getItem("JWT")});
export const leaveRoom = boardId => socket.emit("room:leave", boardId);
