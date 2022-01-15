import React from "react";
import {useParams} from "react-router";

const BoardSettings = () => {
	const {boardId} = useParams();

	return (
		<div>
			<h1>Board #{boardId} settings</h1>
		</div>
	);
};

export default BoardSettings;