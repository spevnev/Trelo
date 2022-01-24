import React from "react";
import {useParams} from "react-router";
import styled from "styled-components";
import {useSelector} from "react-redux";
import List from "./List";
import NavBar from "./NavBar";
import {getBoard, getCards} from "../../redux/selectors";

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
	const board = useSelector(getBoard(boardId));
	const cards = useSelector(getCards(boardId));

	return (
		<Container>
			<NavBar boardId={boardId} title={board.title} isFavourite={board.isFavourite}/>

			<Lists>
				{board.lists.map(cur =>
					<List boardId={boardId} key={cur.id} {...cur} cards={cards.filter(card => card.listId === cur.id)}/>,
				)}
			</Lists>
		</Container>
	);
};

export default Board;