import React, {useEffect} from "react";
import {useParams} from "react-router";
import {Outlet} from "react-router-dom";
import {joinRoom, leaveRoom} from "../services/ws/roomHandler";

// Manages websocket rooms
const WsWrapper = () => {
	const {boardId} = useParams();

	useEffect(() => {
		joinRoom(boardId);
		return () => leaveRoom(boardId);
	}, [boardId]);

	return <Outlet/>;
};

export default WsWrapper;