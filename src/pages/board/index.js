import React from "react";
import {useParams} from "react-router";

const Board = () => {
	const {boardId} = useParams();

	return (
		<div>
			<h1>Board #{boardId}</h1>
		</div>
	);
};

export default Board;