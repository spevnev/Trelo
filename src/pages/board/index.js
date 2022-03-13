import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import List from "./List";
import NavBar from "./NavBar";
import {getBoard, getCards} from "../../redux/selectors";
import {DragDropContext} from "react-beautiful-dnd";
import {FetchBoard} from "../../redux/thunkActionCreators/boardActionCreator";
import PageLoading from "../../components/PageLoading";
import PageError from "../../components/PageError";
import useKeyboard from "../../hooks/useKeyboard";
import useTitle from "../../hooks/useTitle";
import {ChangeCard, ReorderCards} from "../../redux/thunkActionCreators/cardActionCreator";
import config from "../../config";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 95vh;
  background: #0179bf;
`;

const Lists = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 2vw;
  height: 100%;
  overflow-x: scroll;
  overflow-y: hidden;

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
	const cards = useSelector(getCards(boardId)) || [];
	const bodyRef = useRef(document.body);
	const [isLoading, setIsLoading] = useState(!board);

	useKeyboard({ref: bodyRef, key: "escape", cb: () => navigate("/")});

	useTitle(board && board.title ? board.title : "Board");

	useEffect(() => {
		if (!board) dispatch(FetchBoard(boardId));
		setTimeout(() => setIsLoading(false), config.FORCE_LOADING_MS);
	}, []);


	if (isLoading) return <PageLoading/>;
	if (!board || board.status === "ERROR") return <PageError>This board doesn't exist or you aren't a member of it!</PageError>;
	if (board.status === "LOADING") return <PageLoading/>;


	const onDragEnd = e => {
		if (!e.destination) return;

		const srcListId = e.source.droppableId;
		const srcInd = e.source.index;
		const dstListId = e.destination.droppableId;
		const dstInd = e.destination.index;
		const cardId = e.draggableId;

		if (srcListId === dstListId && srcInd === dstListId) return;

		const order = [];
		if (srcListId === dstListId) {
			const isBetweenDstAndSrc = order => order >= dstInd && order < srcInd;
			const isBetweenSrcAndDst = order => order > srcInd && order <= dstInd;

			cards.forEach(card => {
				if (card.listId !== srcListId) return;

				if (srcInd > dstInd && isBetweenDstAndSrc(card.order))
					order.push({id: card.id, order: card.order + 1});
				else if (srcInd < dstInd && isBetweenSrcAndDst(card.order))
					order.push({id: card.id, order: card.order - 1});
			});
		} else {
			cards.forEach(card => {
				if (card.listId === srcListId && card.order > srcInd)
					order.push({id: card.id, order: card.order - 1});
				else if (card.listId === dstListId && card.order >= dstInd)
					order.push({id: card.id, order: card.order + 1});
			});
		}

		if (order.length > 0) dispatch(ReorderCards(boardId, order));
		dispatch(ChangeCard(boardId, {...cards.filter(card => card.id === cardId)[0], listId: dstListId, order: dstInd}));
	};


	return (
		<Container>
			<NavBar board={board}/>

			<DragDropContext onDragEnd={onDragEnd}>
				<Lists>
					{board.lists.map(list => <List boardId={boardId} key={list.id} {...list} cards={cards.filter(card => card.listId === list.id)}/>)}
				</Lists>
			</DragDropContext>
		</Container>
	);
};

export default Board;