import React, {useEffect} from "react";
import {useParams} from "react-router";
import {Outlet} from "react-router-dom";
import connectSocket from "../services/ws";
import {getToken} from "../services/jwt";

let roomHandler;
const WsWrapper = () => {
	const {boardId} = useParams();

	useEffect(() => {
		if (getToken() && !roomHandler) roomHandler = connectSocket();

		roomHandler.join(boardId);
		return () => roomHandler.leave(boardId);
	}, [boardId]);

	return <Outlet/>;
};

export default WsWrapper;