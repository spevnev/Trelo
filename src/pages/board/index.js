import React, {useEffect} from "react";
import {useParams} from "react-router";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import List from "./List";
import NavBar from "./NavBar";
import {getBoard, getCards} from "../../redux/selectors";
import {DragDropContext} from "react-beautiful-dnd";
import {changeCard} from "../../redux/actionCreators/cardActionCreator";
import {fetchBoard} from "../../redux/actionCreators/boardActionCreator";
import PageLoading from "../../components/PageLoading";
import PageError from "../../components/PageError";

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
	const dispatch = useDispatch();
	const {boardId} = useParams();
	const board = useSelector(getBoard(boardId));
	const cards = useSelector(getCards(boardId));

	useEffect(() => {
		if (board === null) dispatch(fetchBoard(boardId));
	}, []);

	const onDragEnd = e => {
		const cardId = e.draggableId;
		const listId = e.destination.droppableId;

		dispatch(changeCard(boardId, cardId, {listId}));
	};

	if (!board || board.status === "LOADING")
		return <PageLoading/>;

	if (board.status === "ERROR")
		return <PageError>This board doesn't exist or you aren't a member of it!</PageError>;

	return (
		<Container>
			<NavBar boardId={boardId} title={board.title} isFavourite={board.isFavourite}/>

			<DragDropContext onDragEnd={onDragEnd}>
				<Lists>
					{board.lists.map(cur =>
						<List boardId={boardId} key={cur.id} {...cur} cards={cards.filter(card => card.listId === cur.id)}/>,
					)}
				</Lists>
			</DragDropContext>
		</Container>
	);
};

export default Board;