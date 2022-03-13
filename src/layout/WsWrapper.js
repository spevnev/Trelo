import React, {useEffect} from "react";
import {useParams} from "react-router";
import {Outlet} from "react-router-dom";
import {roomHandler} from "../services/ws";

// Manages websocket rooms
const WsWrapper = () => {
	const {boardId} = useParams();

	useEffect(() => {
		roomHandler.join(boardId);
		return () => roomHandler.leave(boardId);
	}, [boardId]);

	return <Outlet/>;
};

export default WsWrapper;