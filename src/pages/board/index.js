import React from "react";
import {useParams} from "react-router";
import styled from "styled-components";
import {useSelector} from "react-redux";

import List from "./List";
import NavBar from "./NavBar";

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
	const board = useSelector(state => state.board.filter(cur => cur.id === boardId)[0]);

	return (
		<Container>
			<NavBar boardId={boardId} title={board.title} isFavourite={board.isFavourite}/>

			<Lists>{board.lists.map(cur => <List boardId={boardId} key={cur.id} {...cur}/>)}</Lists>
		</Container>
	);
};

export default Board;