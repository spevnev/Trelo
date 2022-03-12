import socket from "./index";

export const joinRoom = boardId => socket.emit("room:join", boardId);
export const leaveRoom = boardId => socket.emit("room:leave", boardId);
