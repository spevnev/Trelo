import React from "react";
import {useParams} from "react-router";

const CardDescription = () => {
	const {boardId, cardId} = useParams();

	return (
		<div>
			<h1>Board #{boardId} - Card #{cardId} description</h1>
		</div>
	);
};

export default CardDescription;