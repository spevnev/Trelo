import React from "react";
import {useParams} from "react-router";
import styled from "styled-components";

import NavBar from "./NavBar";
import List from "./List";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Lists = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
`;

const Board = () => {
	const {boardId} = useParams();

	return (
		<Container>
			<NavBar boardId={boardId}/>
			<Lists>
				<List title="List 1" cards={[{title: "Card 1", id: 1}, {title: "Card 2", id: 2}]}/>
				<List title="List 2" cards={[{title: "Card 3", id: 3}, {title: "Card 4", id: 4}, {title: "Card 5", id: 5}]}/>
			</Lists>
		</Container>
	);
};

export default Board;