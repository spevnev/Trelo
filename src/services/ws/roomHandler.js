const createRoomHandler = socket => {
	const join = boardId => socket.emit("room:join", {boardId, token: localStorage.getItem("JWT")});
	const leave = boardId => socket.emit("room:leave", boardId);

	return {join, leave};
};

export default createRoomHandler;