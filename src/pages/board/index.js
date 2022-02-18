import React, {useEffect, useRef} from "react";
import {useNavigate, useParams} from "react-router";
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
import useKeyboard from "../../hooks/useKeyboard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Lists = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2rem 0;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
    background: transparent;
    opacity: 0;
  }
`;


const Board = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {boardId} = useParams();
	const board = useSelector(getBoard(boardId));
	const cards = useSelector(getCards(boardId));

	const ref = useRef(document.body);
	useKeyboard([{ref, key: "escape", cb: () => navigate("/")}]);


	useEffect(() => {
		if (board === null) dispatch(fetchBoard(boardId));
	}, []);

	if (!board || board.status === "LOADING") return <PageLoading/>;
	if (board.status === "ERROR") return <PageError>This board doesn't exist or you aren't a member of it!</PageError>;


	const onDragEnd = e => {
		const cardId = e.draggableId;
		const listId = e.destination.droppableId;

		if (cardId && listId) dispatch(changeCard(boardId, {...cards.filter(cur => cur.id === cardId)[0], listId}));
	};


	return (
		<Container>
			<NavBar board={board}/>

			<DragDropContext onDragEnd={onDragEnd}>
				<Lists>
					{board.lists.map(cur => <List boardId={boardId} key={cur.id} {...cur} cards={cards ? cards.filter(card => card.listId === cur.id) : []}/>)}
				</Lists>
			</DragDropContext>
		</Container>
	);
};

export default Board;